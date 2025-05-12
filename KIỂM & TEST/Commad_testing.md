# PHÂN CẤP MEMBER WORKSPACE + SECURITY

## DOCKER
```
vi docker-install.sh
```
```
#!/bin/bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update -y
sudo apt install docker-ce -y
sudo systemctl start docker
sudo systemctl enable docker
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker -v
docker-compose -v
```
```
chmod +x docker-install.sh
```
```
sh docker-install.sh
```
---

## QUÉT BẢO MẬT: CODELIMATE.
=> Cần docker.

### Dockerfile
```
FROM node:21-alpine

# Create app directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install --force

# Build Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
```
- Cài codeclimate:
```
docker pull codeclimate/codeclimate:latest
```
- Build workspace:
```
docker build -t workspace . 
```
- Test:
```
docker run --interactive --tty --rm --env CODECLIMATE_CODE="$PWD" --volume "$PWD":/code --volume /var/run/docker.sock:/var/run/docker.sock --volume /tmp/cc:/tmp/cc codeclimate/codeclimate analyze -f html > codeclimate_workspace.html
```


---

## QUÉT BẢO MẬT: SNYK.
```
npm i snyk -g
```
```
npm i snyk-to-html -g
```
```
snyk auth $token
```
```
snyk test
```
```
snyk monit
```
```
snyk test --json | snyk-to-html -o workspace.html
```
---

## CÁCH LẤY FILE TEST SOURCE TRONG SERVER:
```
scp root@103.77.240.97:/root/workspaces/workspace.html /mnt/c/Users/PC/Desktop/
```
---

## TRIVY
- Test source code:
```
docker run aquasec/trivy fs .
```
![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/ARLv6pFES4KST4yaJqdGT.png?ixlib=js-3.7.0 "image.png")

```
docker run --rm \
-v "$PWD":/workspace \
aquasec/trivy \
  fs /workspace \
  --severity CRITICAL,HIGH,MEDIUM
```
```
docker run --rm -v $PWD:/workspaces -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy fs /workspaces --severity HIGH,CRITICAL --format template --template "@contrib/html.tpl" --output /workspaces/TRIVYFS_REPORT.html
```
---

## ARACHNI
```
docker run --network host -d -p 222:22 -p 7331:7331 -p 9292:9292 --name arachni arachni/arachni:latest
```
![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/6WkBwqT-Nn55QOHfoWPnE.png?ixlib=js-3.7.0 "image.png")

```
admin@admin.admin
administrator
```
![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/M2eVWcjpDdiFMpdBtgiRo.png?ixlib=js-3.7.0 "image.png")



![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/frLTYiWzl-mAH1sCk8ee4.png?ixlib=js-3.7.0 "image.png")

---

## K6
![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/EtPgUMUDgJlrOmuhDGF6Q.png?ixlib=js-3.7.0 "image.png")

- Cài đặt: 
```
sudo gpg -k
```
```
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
```
```
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
```
```
sudo apt-get update
```
```
sudo apt-get install k6
```
```
mkdir /tools/test-k6 -p
```
```
cd /tools/test-k6
```
- Tạo người dùng ảo:
```
vi load-test.js
```
```
import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
    vus: 100, // Số lượng VUs sẽ được sử dụng trong quá trình thử nghiệm
    duration: '10s', // Thời lượng của mỗi giai đoạn thử nghiệ
    thresholds: {
        http_req_duration: ['p(95)<500'], // Đặt ngưỡng cho thời gian phản hồi trung bình dưới 500ms và thời gian phản hồi 95% dưới 1000ms
    },
};
export default function () {
    let res = http.get('https://workspaces-lovat.vercel.app/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1); // Đợi 1 giây giữa các yêu cầu
}
```
```
k6 run load-test.js
```
![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/hKhTsPPYwDkC17mO6nE0_.png?ixlib=js-3.7.0 "image.png")

- Kịch bản login:
```
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    const url = 'https://workspaces-lovat.vercel.app/api/auth/login';

    // Định nghĩa dữ liệu đăng nhập
    const validPayload = JSON.stringify({
        email: 'system@gmail.com',
        password: 'system@gmail.com',
    });

    const invalidPayload = JSON.stringify({
        email: 'taikhoanfake@gmail.com',
        password: 'taikhoanfake@gmail.com',
    });

    // Định nghĩa các tiêu đề yêu cầu nếu cần thiết
    const headers = {
        'Content-Type': 'application/json',
    };

    function random() {
        return Math.random() < 0.5;
    }

    const isSuccess = random();
    // Gửi yêu cầu POST để đăng nhập
    let res;
    if (isSuccess) {
        res = http.post(url, validPayload, { headers });
    } else {
        res = http.post(url, invalidPayload, { headers });
    }

    sleep(1);
}
```
```
k6 run -u 100 -d 10s login_test.js
```
![image.png](https://eraser.imgix.net/workspaces/3aGPediIr5kus1y7vD6g/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/Ltxpzn6SKxrVBiPs9yiH3.png?ixlib=js-3.7.0 "image.png")

- Kịch bản login user thay đổi bất thường:
```
vi spike-test.js
```
```
k6 run spike-test.js
```
```
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '10s', target: 500 },
        { duration: '3m', target: 50 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    const res = http.get(
        'https://workspaces-lovat.vercel.app/api/auth/current',
    );
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
```


## 🔹 **TỔNG QUAN: TOTAL RESULTS**
### ✅ **HTTP**
Các chỉ số liên quan đến HTTP request:

#### 1. `**http_req_duration**` 
- **Thời gian hoàn tất 1 HTTP request** (bao gồm DNS lookup, TCP handshake, thời gian xử lý của server,...)
- Chi tiết:
    - `avg=812.03ms` : thời gian trung bình.
    - `min=343.08ms` : request nhanh nhất.
    - `med=553.46ms` : trung vị (50% nhanh hơn).
    - `max=8.72s` : request chậm nhất.
    - `p(90)=1.3s` : 90% request dưới 1.3 giây.
    - `p(95)=1.87s` : 95% request dưới 1.87 giây.
>  Chỉ số này giúp đánh giá **độ trễ** (latency) của hệ thống khi chịu tải. 

#### 2. `**{ expected_response:true }**` 
- Là subset các request có **response hợp lệ** (mã HTTP 2xx hoặc 3xx).
- Cho thấy:
    - Trung bình **request thành công mất 1.15 giây**, dài hơn cả overall (do nhiều request thất bại nhanh chóng).
    - `p(95)=4.22s` : 5% request hợp lệ mất đến hơn 4 giây => có thể do nghẽn server.
#### 3. `**http_req_failed**` 
- Tỷ lệ request bị lỗi (không nhận được response hợp lệ).
- `48.46%` : **300 trên tổng 619** request bị lỗi (ví dụ: 4xx, 5xx hoặc timeout).
>  Đây là **chỉ số cảnh báo quan trọng**. Gần 50% request thất bại => hệ thống **không ổn định** hoặc đang bị quá tải. 

#### 4. `**http_reqs**` 
- Tổng số HTTP requests được gửi: `619` 
- Tốc độ gửi: ~`31.57 request/s` 
---

### ✅ **EXECUTION**
Liên quan đến vòng lặp của từng Virtual User (VU):

#### 5. `**iteration_duration**` 
- Thời gian thực hiện 1 iteration (gồm gửi request + sleep 1s).
- `avg=1.88s` : mỗi vòng trung bình mất gần 2 giây (request chiếm ~800ms + 1s `sleep` ).
- `p(95)=3.05s` : 5% iteration kéo dài đến hơn 3 giây.
#### 6. `**iterations**` 
- Tổng số vòng lặp đã chạy: `619`  (tương đương số request).
- Tốc độ chạy: `31.57 vòng/s` 
---

### ✅ **VUS (Virtual Users)**
- `vus` : số VU đang hoạt động tại thời điểm hiện tại.
    - `min=1` , `max=100` : có thể do ramp-up ban đầu hoặc vấn đề cấu hình test.
- `vus_max` : số VU tối đa: 100 (theo tham số `-u 100` )
---

### ✅ **NETWORK**
Dữ liệu được truyền/nhận:

#### 7. `**data_received**` 
- Tổng dữ liệu nhận: `636 KB`  (~32 KB/s)
#### 8. `**data_sent**` 
- Tổng dữ liệu gửi: `136 KB`  (~6.9 KB/s)
### login v2:
```
import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
    const url = 'https://workspaces-lovat.vercel.app/api/auth/login';

    const validPayload = JSON.stringify({
        email: 'system@gmail.com',
        password: 'system@gmail.com',
    });

    const invalidPayload = JSON.stringify({
        email: 'taikhoanfake@gmail.com',
        password: 'taikhoanfake@gmail.com',
    });

    const headers = {
        'Content-Type': 'application/json',
    };

    const isSuccess = Math.random() < 0.5;
    const payload = isSuccess ? validPayload : invalidPayload;
    const label = isSuccess ? '✅ VALID' : '❌ INVALID';

    const res = http.post(url, payload, { headers });

    // Ghi log kiểm tra
    console.log(`${label} | Status: ${res.status} | Body: ${res.body}`);

    // Check để phân tích thống kê chi tiết hơn
    check(res, {
        'is status 200': (r) => r.status === 200,
        'is status 401': (r) => r.status === 401,
    });

    sleep(1);
}
```


