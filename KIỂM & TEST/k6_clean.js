import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export let options = {
    stages: [
        { duration: '1m', target: 10 },  // Ramp up to 10 users over 1 minute
        { duration: '2m', target: 50 },  // Ramp up to 50 users over 2 minutes
        { duration: '1m', target: 10 },  // Ramp down to 10 users over 1 minute
        { duration: '1m', target: 0 },   // Ramp down to 0 users over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests should complete within 2s
        http_req_failed: ['rate<0.1'],     // Less than 10% of requests should fail
    },
};

// Load test users
const users = new SharedArray('users', function () {
    try {
        return JSON.parse(open('./users.json'));
    } catch (error) {
        console.error('Failed to load users.json:', error.message);
        return [];
    }
});

// Helper functions
function randomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function encodeForm(data) {
    return Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

function validateResponse(response, checks) {
    const result = check(response, checks);
    if (!result) {
        console.error(`Request failed: ${response.status} - ${response.body}`);
    }
    return result;
}

export default function () {
    const baseURL = 'https://workspaces-lovat.vercel.app/api';

    group('Load Test Flow', () => {
        // 1. Login
        const user = users[Math.floor(Math.random() * users.length)];
        const loginPayload = JSON.stringify({
            email: user.email,
            password: user.password,
        });

        const loginResponse = http.post(`${baseURL}/auth/login`, loginPayload, {
            headers: { 'Content-Type': 'application/json' },
            tags: { name: 'Login' },
        });

        const loginSuccess = validateResponse(loginResponse, {
            'login status is 200': (r) => r.status === 200,
            'login success': (r) => r.json('workspace-session') !== '',
        });

        if (!loginSuccess) {
            console.error('Login failed, stopping test flow');
            return;
        }

        const authToken = loginResponse.json('workspace-session');
        sleep(1);

        // 2. Get Current User
        const currentUserResponse = http.get(`${baseURL}/auth/current`, {
            headers: { Authorization: `Bearer ${authToken}` },
            tags: { name: 'GetCurrentUser' },
        });

        const currentUserSuccess = validateResponse(currentUserResponse, {
            'current user status is 200': (r) => r.status === 200,
            'has user data': (r) => r.json('data') !== undefined,
        });

        if (!currentUserSuccess) {
            console.error('Failed to get current user, stopping test flow');
            return;
        }

        const currentUser = currentUserResponse.json('data');
        sleep(1);

        // 3. Create Workspace
        if (!currentUser?.targets?.length) {
            console.error('Invalid user data structure:', JSON.stringify(currentUser));
            return;
        }

        const wsName = randomCode();
        const workspacePayload = encodeForm({
            name: wsName,
            inviteCode: wsName,
            userId: currentUser.targets[0].userId,
        });

        const createWorkspaceResponse = http.post(`${baseURL}/workspaces`, workspacePayload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            tags: { name: 'CreateWorkspace' },
        });

        validateResponse(createWorkspaceResponse, {
            'create workspace status is 200': (r) => r.status === 200,
            'workspace created successfully': (r) => r.json('success') === true,
        });

        console.log(`Workspace creation [status=${createWorkspaceResponse.status}] response=${createWorkspaceResponse.body}`);
        sleep(1);
    });
}
