# PHÂN CẤP OWNER WORKSPACE AND SYSTEM + CÂU HỎI

## BỘ CÂU TRẢ LỜI NHÓM 4
---

### **Câu 1:** Nhóm đã xác định rõ luồng chuyển trạng thái của **task** chưa? Ví dụ: task đang "Đang làm" có thể chuyển thẳng sang "Hoàn thành" hay phải qua bước "Kiểm tra"? Nếu chưa có quy tắc cụ thể thì nhóm có cảm thấy logic hệ thống có hơi lỏng lẻo không?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

1. **Thứ nhất:** Nhóm đã xác định rõ luồng chuyển trạng thái của task chưa?
    1. Nhóm mình đã xác định luồng chuyển trạng thái là: 
        1. **BACKLOG: **Những ý tưởng, yêu cầu thu thập ban đầu, chưa được lên kế hoạch cụ thể.
        2. **TO DO:** Task đã được cân nhắc ưu tiên và lên kế hoạch, sẵn sàng để ai đó nhận làm.
        3. **IN PROGRESS: **Thành viên đã nhận task và đang thực hiện.
        4. **IN REVIEW:** Khi hoàn thành công việc, bạn có thể đính kèm tài liệu hoặc hướng dẫn chi tiết vào mục Description để QA/Leader kiểm tra.
        5. **DONE:** Sẽ có 2 trường hợp:
            1. Trường hợp 1: Nếu phát hiện lỗi hoặc phát sinh yêu cầu thay đổi, task sẽ được mở lại để xử lý tiếp.
            2. Trường hợp 2: Sau khi đánh giá, duyệt xong và không còn vấn đề nào cần xử lý.
2. **Thứ hai:** Ví dụ: task đang "Đang làm" có thể chuyển thẳng sang "Hoàn thành" hay phải qua bước "Kiểm tra"? Nếu không, làm sao họ biết có sự thay đổi quan trọng?
    1. ==> Nhóm mình khi thiết kế chức năng cũng rất lưu ý đến tính ràng buộc chặt chẽ của luồng công việc. Tuy nhiên, chúng mình cũng muốn giữ một chút sự linh hoạt để người dùng cảm thấy thoải mái hơn. Bởi vì, trước khi bắt đầu sử dụng phần mềm, mỗi nhóm hay công ty đều đã thống nhất quy trình và quy tắc làm việc chung. Do đó, phần mềm của mình chỉ cần hỗ trợ, chứ không nên trở thành “gông cùm” cứng nhắc.
3. **Thứ ba:** Giải pháp cho sự thiếu sót của nhóm mình:
    1. **Cảnh báo khi bỏ qua bước kiểm tra:**
        1. Nếu ai đó cố gắng di chuyển thẳng từ **In Progress → Done** mà chưa qua **In Review**, hệ thống sẽ hiện pop-up báo lỗi yêu cầu chuyển task đến **In Review **Leader kiểm tra.
    2. **Quyền hạn:**
        1. Chỉ có Admin - Owner mới có thể di task đến **DONE.**
---

### **Câu 2: **Nếu chẳng may người dùng **xóa **nhầm một **workspace **hoặc **project **hoặc **task**, hệ thống có cơ chế nào để người dùng phục hồi không?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

1. **Thứ nhất:** Phân quyền xóa:
    1. **Workspace**: Chỉ **Owner** mới có quyền xóa; Admin và Member không thể xóa.
    2. **Project/Task**: Chỉ **Owner** và **Admin** mới có quyền xóa; Member bình thường không đủ quyền.
2. **Thứ hai: **Xác nhận xóa 2 bước:
    1. Khi Owner/Admin nhấn “Xóa”, phần mềm sẽ hiện **modal cảnh báo nguy hiểm** kèm nội dung: “Bạn chắc chắn muốn xóa vĩnh viễn? Đây là hành động không thể hoàn tác.” 
    2. Sau đó phải nhấn thêm lần nữa mới chính thức thực thi lệnh xóa — giảm tối đa nguy cơ nhấn nhầm.
3. **Thứ ba:** Giả sử có người nhấn nhầm 2 lần thì hệ thống không có tính năng khôi phục tự động:
    1. Nếu lỡ nhấn xác nhận xóa hai lần, dữ liệu sẽ **bị xoá vĩnh viễn** và không thể phục hồi.
    2. Ví dụ tương tự như GitHub: họ cũng chỉ dùng modal cảnh báo, sau đó xóa là mất, không có “Thùng rác” hay “rác” để khôi phục.
4. **Thứ tư:** Giải pháp của nhóm mình về vấn đề này: 
    1. Khi Owner/Admin nhấn “Xóa” và xác nhận bước 2, modal sẽ hiển thị thêm một đoạn **mã bảo mật ngẫu nhiên** (ví dụ “X7K2P”).
    2. Người dùng phải **gõ đúng đoạn mã** này vào ô input dưới modal mới kích hoạt nút “Xác nhận xóa vĩnh viễn”.
    3. Cơ chế này giúp đảm bảo mọi thao tác xóa đều có sự chủ động cao, gần như không thể vô tình xoá nhầm dù đã qua hai bước cảnh báo.
---

### **Câu 3: **Khi task bị quá hạn, hệ thống có tự động gửi thông báo cho người được giao hoặc quản lý không? Nếu không có, thì làm sao để người dùng biết task bị trễ?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

1. **Thứ nhất: **Hiện tại nhóm mình chưa có thông báo tự động:
    1. Hệ thống chưa gửi email hay có chức năng thông báo (notification) khi deadline đã qua.
2. **Thứ hai: **Phần mềm có cơ chế trực quan ngay trên giao diện:
    1. **Màu sắc trạng thái:**
        1. **Màu trắng: **Còn nhiều thời gian (lớn hơn 15 ngày).
        2. **Màu vàng**: Còn khá nhiều thời gian (trong khoảng 8 đến 14 ngày).
        3. **Màu cam**: Sắp hết hạn (trong khoảng 4 đến 7 ngày).
        4. **Đỏ**: Sắp quá hạn (dưới 3 ngày).
        5. `let textColor = 'text-muted-foreground';
if (diffInDays <= 3) {
    textColor = 'text-red-500';
} else if (diffInDays <= 7) {
    textColor = 'text-orange-500';
} else if (diffInDays <= 14) {
    textColor = 'text-yellow-500';
}` 
3. **Thứ ba: **Bộ lọc & tìm kiếm chuyên biệt:
    1. Thêm bộ lọc tìm kiếm **“Overdue”** để nhanh chóng liệt kê các task quá hạn.
    2. Cho phép lọc theo người được giao, giúp cá nhân đối chiếu xem có task nào đang trễ không.
4. **Thứ tư: **Analytics Dashboard cho toàn bộ người dùng:
    1. Tổng hợp số lượng task quá hạn.
    2. Biểu đồ xu hướng (trend) số task quá hạn theo project.
    3. Admin/leader có thể dùng bộ lọc tìm kiếm trên dashboard để “truy vết” các trường hợp trễ và xử lý phù hợp theo các điều luật của công ty cũng như các nhóm học tập.
5. **Thứ năm: **Giải pháp cho trường hợp trên:
    1. Tuy đã có bộ lọc tìm kiếm cũng như chức năng phân tích trực quan để truy vết, nhưng nhóm mình cũng sẽ thêm chức năng thông báo như:
        1. **Thông báo Email:** khi task sắp đến hạn (ví dụ 24 giờ trước deadline).
        2. **Chức năng thông báo: **Cho các thành viên cũng như Admin, không ai bị bỏ sót thông tin.
---

### **Câu 4: **Hiện tại mỗi task chỉ có thể giao cho một người. Nhóm có xem xét trường hợp nhiều người cùng thực hiện một task chưa? Nếu không, hệ thống xử lý thế nào với công việc có tính chất làm việc theo nhóm?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

1. **Thứ nhất: **Thực trạng hiện tại:
    1. Mỗi task chỉ có **một** trường “Assignee”, tức chỉ gán cho một cá nhân chịu trách nhiệm chính.
    2. Với công việc cần nhiều người hỗ trợ, team thường phải:
        1. Tạo sub-task (nhiệm vụ phụ), rồi gom lại dưới một task mẹ.
        2. Hoặc ghi rõ trong Description/ các comment ai  trợ giúp phần nào.
    3. => Và hạn chế của thực trạng này là:
        - Phải quản lý nhiều sub-task, dễ bị rời rạc.
        - Dễ bị bỏ sót ai đóng góp chung mà không "chính danh" được công nhận.
        - Khó tổng kết tiến độ toàn bộ nhóm trên cùng một task.
2. **Thứ hai: **Giải pháp khắc phục hiện trạng:
    1. **Giải pháp thứ nhất:**
        - Thêm chức năng gán được nhiều assignee (người được giao nhiệm vụ).
        - Hiển thị avatar của tất cả người được gán ngay trên card/task.
        - Thêm chức năng vai trò trong task:
            - Bổ sung các trường như "Role" (ví dụ: Lead, Reviewer, Support) để rõ ai làm gì.
        - Bổ sung chức năng Analytics task, hiển thị sự đóng góp của từng thành viên trên cùng một task.
    2. **Giải pháp thứ hai: **
        1. Tạo một Project mới lấy tên là group task hoặc đại khái về 1 cuộc làm việc của một task nhiều và trong Project này sẽ thực hiện các task con gồm nhiều assignee (người được giao nhiệm vụ).
---

**Câu 5: Hiện nay có nhiều phần mềm quản lý task như Trello, Jira... Phần mềm của nhóm có gì khác biệt, hoặc cải tiến nào khiến người dùng chọn nhóm thay vì các phần mềm sẵn đó?**

Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

1. **Thứ nhất:** Mình xin nói về các phần mềm cũng như hệ sinh thái của Trello, Jira, hay các loại phần mềm khác.
    1. **Jira** mạnh về custom workflow, báo cáo phức tạp, hệ sinh thái plugin khổng lồ—phù hợp với các dự án quy mô lớn, nhiều team, đòi hỏi quy trình chặt chẽ.
    2. **Trello** linh hoạt theo mô hình board, nhưng thiếu các báo cáo nâng cao và phân quyền chi tiết.
    3. **Phần mềm của chúng mình** rút gọn các tính năng quan trọng nhất: lập task, phân công, theo dõi tiến độ, báo cáo cơ bản, thông báo trạng thái. Không có những module “không cần thiết” cho nhóm nhỏ, giúp người dùng tập trung hoàn thành công việc thay vì cấu hình hệ thống.
2. **Thứ hai:** Dễ sử dụng, dễ triển khai:
    - Giao diện trực quan, ít bước click, không yêu cầu cài plugin hay tích hợp rườm rà.
    - Onboarding cho người mới: chỉ mất 5 phút để làm quen — quá trình tạo workspace, project, task rất đơn giản, không “overwhelming” như Jira.
3. **Thứ ba:** Tối ưu cho môi trường học tập và làm việc và hiệu suất nhẹ:
    - Phù hợp cho sinh viên làm nhóm, freelancer xử lý nhiều dự án nhỏ.
    - Chạy mượt trên cả máy cấu hình yếu, mobile web, bởi vì không tích hợp quá nhiều plugin phức tạp.
---

### Câu 6: Một member đang đảm nhiệm task nào đó, nếu ai đó xóa member ra khỏi workspace thì sẽ có ảnh hưởng gì?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

==> Câu hỏi này thật sự đúng với trường hợp mà nhóm mình gặp phải, khi nhóm mình bắt đầu code xong chức năng task và kêu thành viên nhóm vào test, thì có test thử chức năng add member rồi tạo task phân cho mỗi người và mình click xóa member, thì project kia nó bị lỗi luôn, và khi truy vết nhờ vào công nghệ Typescript thì mình đã biết lỗi ở đâu và fix như nào:

- **Giải pháp cũng như hiện trạng hiện tại:**
    - **Giữ nguyên task**: Mọi thông tin (title, deadline, mô tả, trạng thái…) vẫn được lưu lại.
    - **Hiển thị cảnh báo rõ ràng**: Phần giao diện task sẽ hiện thêm dòng màu đỏ “Member này đã bị xóa khỏi workspace”.
    - **Không ảnh hưởng đến UX**: 
        - Task vẫn load bình thường, chỉ phần “Người được giao” hiện là “Member này đã bị xóa khỏi workspace”.
        - Các tính năng khác (chuyển trạng thái, comment, attach file…) vẫn hoạt động với task.
---

### Câu 7:  Hệ thống có cho phép chuyển quyền sở hữu workspace cho người khác không? Nếu có, thao tác này có cần xác nhận từ cả hai bên không, hay chỉ cần phía chủ sở hữu cũ?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

- **Hiện tại nhóm mình  chưa hỗ trợ cũng như chưa phát triển chức năng chuyển quyền sở hữu Workspace:**
    1. Khi thiết kế, nhóm mình tập trung vào đối tượng người dùng cá nhân, nhóm nhỏ hoặc sinh viên, với các tác vụ cơ bản.
    2. Việc thêm chức năng “chuyển nhượng quyền sở hữu” phức tạp và dễ trùng lặp với các nền tảng lớn như Trello, Jira… nên ở giai đoạn hiện tại, chúng mình chưa tích hợp.
- **Lý do cho việc trên là:**
    - Giữ cho sản phẩm gọn nhẹ, dễ sử dụng và bảo trì.
    - Tránh phải xây dựng thêm cơ chế bảo mật, xác thực hai bên, và xử lý các kịch bản phức tạp (ví dụ: chủ sở hữu cũ rút quyền, chủ sở hữu mới không chấp nhận…).
- **Định hướng tương lai:**
    - Khi số lượng người dùng và nhu cầu mở rộng tăng lên, nhóm sẽ lắng nghe góp ý từ khách hàng để cân nhắc bổ sung tính năng này.
    - Việc triển khai có thể bao gồm xác nhận hai chiều giữa chủ cũ và chủ mới để đảm bảo an toàn và rõ ràng về trách nhiệm.
        - Và đây là quy trình mà nhóm mình đề ra:
            - Bước 1: Chủ sở hữu workspace A sẽ đưa link nhượng quyền.
            - Bước 2: Chủ mới sẽ vào link và nhấn nút đồng ý nhượng quyền.
            - Bước 3: Chủ sở hữu workspace A sẽ nhận được thông báo và khi click vào sẽ hiển thị modal như sau:
                - Thông báo: Hành động này khiến bạn sẽ mất đi quyền trong workspace A.
                - Hiển thị mật mã để chủ sở hữu workspace A nhập vào chứ không click nhầm.
                - Sau khi nhập mã xong thì tiến hành đồng ý.
---

### Câu 9: Nhóm có định nghĩa trạng thái “kết thúc workspace” không? Nếu có, người dùng có thể rời khỏi workspace khi nó kết thúc không? Và nếu không có trạng thái kết thúc, hệ thống sẽ xử lý vòng đời workspace như thế nào?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

==> Cảm ơn bạn đã đặt câu hỏi. Hiện tại phần mềm chưa có định nghĩa trạng thái “kết thúc” cho workspace, project hay task hay tức mọi bản ghi đều được lưu trữ vô thời hạn. Nhóm mình xin đề xuất giải pháp như sau:

1. **Tạo bảng **`**lifecycle_status**` 
    - `workspace_id`  – lưu ID của workspace
    - `project_id`  – lưu ID của project
    - `task_id`  – lưu ID của task
    - `status`  – ENUM(`Created` , `Active` , `Idle` , `Terminated`): cập nhật trạng thái hiện tại
    - `last_updated`  – timestamp: thời điểm cập nhật trạng thái
2. **Cập nhật workflow chuyển trạng thái**
    - Khi người dùng **tạo** workspace → ghi `status = Created` 
    - Khi bắt đầu thao tác → chuyển sang `Active` 
    - Nếu **idle** quá ngưỡng X phút/giờ → chuyển sang `Idle` 
    - Khi lệnh **terminate**, vòng đời hết hạn → chuyển sang `Terminated` 
3. **Thêm dashboard Analytics  về vòng đời cho người quản lý hệ thống**
- Quản lý hệ thống có thể xem toàn bộ lịch sử trạng thái của mỗi workspace, project, task.
- Từ dashboard này, quản lý quyết định xóa dữ liệu khi kết thúc vòng đời theo chính sách đã định, ví dụ:
    - Dữ liệu có tên “hợp lệ” giữ 1 năm, sau đó xóa vĩnh viễn.
    - Dữ liệu có tên không có ý nghĩa giữ 6 tháng, sau đó xóa vĩnh viễn.
---

### Câu 10: Tài liệu ghi rõ tiền điều kiện của use case register là phải có kết nối internet ổn định, vậy mạng yếu là không thể đăng ký à?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

=> Ở phần tiền điều kiện ở use case Register: Ở đây chỉ định điều kiện lý tưởng để Use Case “Register” chạy mượt: kết nối internet phải ổn định. Nếu mạng yếu, việc gửi request có thể bị timeout, mất gói tin, dẫn đến đăng ký thất bại hoặc phải chờ rất lâu.

**Vậy mạng yếu thì có đăng ký được không ? thì mình xin trả lời là:**
 – Về mặt tài liệu, nếu không thỏa tiền điều kiện, hệ thống có thể từ chối hoặc không đảm bảo hoạt động đúng. 

Nhưng thực tế vẫn có thể hoạt động được, nhưng xác xuất vẫn có thể sẽ xảy ra lỗi và hệ thống sẽ có phần thông báo lỗi:

1. **Hiển thị thông báo rõ ràng** khi mạng kém sẽ hiển thị lỗi “Đã xảy ra lỗii”, để người dùng đăng ký lại.
![image.png](https://eraser.imgix.net/workspaces/bCnzczI15JVOUP4JWNW9/DpOTS3JNCqfpFzjJ3gwiuYtK9vp2/NlHEk9E2fcyMxEaqNrDsc.png?ixlib=js-3.7.0 "image.png")

---

### Câu 11: Với một task đã hoàn thành, hệ thống có cho phép chỉnh sửa nội dung, file đính kèm, người thực hiện không? Việc này có thể làm sai lệch lịch sử công việc?
Mình xin trả lời câu hỏi của bạn ABCXYZ....: 

=> Hiện tại hệ thống mình không cho phép ai ngoài Admin hoặc Owner có thể chỉnh task đã DONE.

### => Và quy trình chỉnh sửa hệ thống hiện tại là:
- **Member muốn sửa** ⇒ phải liên hệ với Admin/Owner qua kênh ngoài (Zalo, Messager, chat nhóm, email…) để **yêu cầu** chỉnh sửa (ví dụ: đổi link file, thay người chịu trách nhiệm).
- **Admin/Owner** sau khi nhận được yêu cầu sẽ vào hệ thống, sẽ vào hệ thống vào tìm đến task đó và chỉnh sửa giúp member.
- **Lý do mà nhóm mình thiết kế như này do**:
    - **Tính toàn vẹn dữ liệu**:
        - Task Done đại diện cho công việc đã hoàn thành và được xác nhận. Cho phép chỉnh sửa tự do có thể làm mất tính nhất quán của dữ liệu (ví dụ: thay đổi link file đính kèm sau khi báo cáo đã được duyệt).
    - **Ngăn ngừa sai sót**:
        - Giới hạn quyền chỉnh sửa giúp giảm thiểu rủi ro từ thao tác "vô ý" của thành viên.
    - **Phù hợp với đối tượng người dùng**:
        - Phần mềm hướng đến người dùng cơ bản → Thiết kế đơn giản, ít chức năng phức tạp.
        - Tránh gây "choáng ngợp" với quá nhiều nút bấm/tùy chọn chỉnh sửa.


**=> Và Nhược điểm của thiết kế hiện tại**

- Phụ thuộc vào kênh liên lạc ngoài (Zalo, email, v.v.)


**=> Giải pháp cải tiến là nhóm mình sẽ cập nhật:**

- Thêm tính năng "Yêu cầu chỉnh sửa" trong hệ thống.
- Thêm một cột trong bảng Kanban: tên là REOPENED - (Nghĩa tiếng việt: Đã mở)
- Thêm 1 bảng trong cơ sở dữ liệu: để ghi log.
```
id: string// PK
task_id: string// id task thay đổi.
user_id: string // người thực hiện thay đổi trong task.
action_type: ENUM(UPDATE_LINK_FILE, UPDATE_ASSIGNEE, UPDATE_DESCRIPTION) // Loại hành động thay đổi
old_value: // Giá trị cũ trước khi thay đổi (ví dụ: link file cũ, người thực hiện cũ).
new_value: // Giá trị mới sau khi thay đổi
timestamp: // Thời điểm thay đổi.
description: // Lý do thay đổi (được điền bởi admin khi sửa task).
```
- Thêm 1 phần Analytics về thông tin chỉnh sửa số lượng bao nhiều và thêm vào bộ lọc tìm kiếm để truy vết:
- Thêm chức năng thông báo trong hệ thống.
---

- Cách hoạt động:
    - Thành viên nhấn nút "Yêu cầu chỉnh sửa" tên task Done → Điền lý do và thông tin cần thay đổi (file mới, người thực hiện mới, v.v.).
    - Hệ thống tự động thông báo cho admin qua chức năng thông báo.
    - Admin xem xét và **phê duyệt.**
        - Nếu Admin đồng ý thì Admin sẽ đến task đó và kéo/chỉnh sang cột Reopened và ghi log "Admin A mở task cho Member B".
        - Và lúc này chỉ có duy nhất member - admin - owner yều cầu mới chỉnh được task trên. Và sau khi chỉnh link file hay 1 số thông tin như bảng cơ sở dữ liệu cấp -> thì nhấn lưu lại.
        - Sau đó member gửi thông báo sửa xong.
        - Admin nhận thông báo và đến task kiểm tra và cập nhật task DONE lại cho Member.
---

### **Câu 12: **Khi người dùng thay đổi deadline của task, hệ thống có gửi thông báo đến những người liên quan không? Nếu không, làm sao họ biết có sự thay đổi quan trọng?
- Mình xin trả lời câu hỏi của bạn ABCXYZ....: ==> Hiện tại, khi người dùng thay đổi deadline của một task, hệ thống chưa có cơ chế gửi thông báo tự động, cũng như chức thông báo đến những người liên quan. Để đảm bảo mọi thành viên nắm bắt kịp thời các thay đổi quan trọng như deadline của **task**, nhóm mình ta đang tạm thời tận dụng các nền tảng nhắn tin “hot” và phổ biến như **Messenger, Zalo** để gửi thông báo thủ công đến người liên quan đến **task** đó.
- Và mình xin cảm ơn nhóm bạn đã đặt câu hỏi, giúp nhóm mình nhận ra thiếu một chức năng không kém quan trọng của hệ thống. Và trong giai đoạn tiếp theo, nhóm sẽ bổ sung cơ chế thông báo tự động ngay trong hệ thống, cho phép:
    - Gửi email hoặc push chức năng thông báo (notification đến tất cả thành viên liên quan khi có thay đổi deadline.
---

## BỘ CÂU TRẢ LỜI NHÓM 7
### Câu 1: Tại sao lại cần phân chia vai trò giữa Owner, Admin và Member trong Workspace, trong khi một số tính năng của chúng khá giống nhau?
- Mình xin trả lời câu hỏi của bạn ABCXYZ....: 
=> Việc phân chia vai trò trong một dự án quản lý rất quan trọng, vì:

- Mỗi người chỉ được cấp quyền cần thiết để hoàn thành công việc của họ, giảm nguy cơ vô tình (hoặc cố ý) thay đổi, xóa dữ liệu quan trọng.
- Ví dụ, Member chỉ nên được phép tạo và chỉnh sửa task, nhưng không cần – và không nên có – quyền xóa Workspace do Owner thiết lập, nhằm tránh thao tác nhầm và tuân thủ nguyên tắc phân quyền tối thiểu. Vì thế việc phân quyền giữa các bên thật sự quan trọng.
---

### Câu 2: Trong phần “System Management” có thể xem thống kê hệ thống .vậy có phân biệt được các workspace thuộc các tổ chức/nhóm khác nhau không?
- Mình xin trả lời câu hỏi của bạn ABCXYZ....: 
=> Là không, phần “System Management” hiện tại chỉ hiển thị các chỉ số tổng quan của hệ thống, như:

- Tổng số người dùng (user) đang hoạt động
- Số lượng task/workspace/project theo tháng (đồ thị tăng trưởng)
Nó **không** phân tách hay đối chiếu dữ liệu theo từng tổ chức, nhóm hay bất kỳ workspace cụ thể nào — và cũng không đi sâu vào nội dung mà người dùng đang thao tác. Phần này chỉ để monitoring tổng thể.

---

### Câu 3: Chức năng “Analytics Workspace” có cập nhật theo thời gian thực hay theo chu kỳ?
- Mình xin trả lời câu hỏi của bạn ABCXYZ....: 
=> Chức năng “Analytics Workspace” hiện không chạy theo lịch định kỳ mà luôn cập nhật ngay khi có sự kiện liên quan như:

1. **Cập nhật tức thời:**
 Mỗi khi người dùng tạo/sửa/xóa task, project hay thay đổi bất kỳ dữ liệu nào trong Workspace, phía frontend sẽ gọi API để lấy ngay số liệu Analytics mới nhất và hiển thị ngay lập tức.
2. **Không sử dụng WebSocket:**
 Hiện tại nhóm mình chưa triển khai kênh đẩy (push) qua Socket.IO hay WebSocket, nên UI chỉ “lắng nghe” và cập nhật qua các request sau mỗi thao tác của người dùng hoặc khi load lại trang.
---

### Câu 4: Hệ thống có cơ chế cảnh báo deadline sắp đến hoặc task bị bỏ quên không?
Mình xin trả lời câu hỏi của bạn ABCXYZ....:

1. **Thứ nhất:** Hiện tại nhóm mình chưa có thông báo tự động:
    1. Hệ thống chưa gửi email hay có chức năng thông báo (notification) khi deadline đã qua.
2. **Thứ hai: **Phần mềm có cơ chế trực quan ngay trên giao diện:
    1. **Màu sắc trạng thái:**
        1. **Màu trắng: **Còn nhiều thời gian (lớn hơn 15 ngày).
        2. **Màu vàng**: Còn khá nhiều thời gian (trong khoảng 8 đến 14 ngày).
        3. **Màu cam**: Sắp hết hạn (trong khoảng 4 đến 7 ngày).
        4. **Đỏ**: Sắp quá hạn (dưới 3 ngày).
3. **Thứ ba:** Bộ lọc & tìm kiếm chuyên biệt:
    1. Thêm bộ lọc tìm kiếm **“Overdue”** để nhanh chóng liệt kê các task quá hạn.
    2. Cho phép lọc theo người được giao, giúp cá nhân đối chiếu xem có task nào đang trễ không.
4. **Thứ tư:** Analytics Dashboard cho toàn bộ người dùng:
    1. Tổng hợp số lượng task quá hạn.
    2. Biểu đồ xu hướng (trend) số task quá hạn theo project.
    3. Admin/leader có thể dùng bộ lọc tìm kiếm trên dashboard để “truy vết” các trường hợp trễ và xử lý phù hợp theo các điều luật của công ty cũng như các nhóm học tập.
5. **Thứ năm:** Giải pháp cho trường hợp trên:
    1. Tuy đã có bộ lọc tìm kiếm cũng như chức năng phân tích trực quan để truy vết, nhưng nhóm mình cũng sẽ phát triển thêm chức năng thông báo như:
        1. **Thông báo Email:** khi task sắp đến hạn (ví dụ 24 giờ trước deadline).
        2. **Chức năng thông báo: **Cho các thành viên cũng như Admin, không ai bị bỏ sót thông tin.
---

### Câu 5: Các thao tác kéo và thả task có đảm bảo an toàn dữ liệu không.Nếu bị gián đoạn giữa chừng (ví dụ mất mạng), thao tác đó có rollback hay retry không?
Mình xin trả lời câu hỏi của bạn ABCXYZ....:

- **Thứ nhất: Cơ chế hiện tại:**
    - Cập nhật “ngay lập tức” trên UI với cơ chế optimistic update
    - Ngay khi người dùng thả task, frontend sẽ cập nhật tạm thời vị trí mới (giúp UX mượt mà).
    - Đồng thời gọi API gửi yêu cầu di chuyển task xuống server.
- **Thứ hai: Xử lý lỗi ngoại lệ, rollback và retry:**
    - Giao diện sẽ tự động “quay ngược”  về vị trí cũ của task, đảm bảo không có thay đổi sai lệch hiển thị.
    - Hiển thị thông báo lỗi (toast) cho người dùng.
---

### Câu 6: Khi một thành viên bị xóa khỏi Workspace nhưng vẫn còn giữ task thì task đó sẽ được xử lý thế nào?
Mình xin trả lời câu hỏi của bạn ABCXYZ....:

- Khi một Member bị xóa khỏi Workspace, các task mà họ đang phụ trách sẽ không bị xóa ngay lập tức mà sẽ vào trạng thái “Unassigned” (chưa có người phụ trách). Cụ thể:
1. **Chuyển task về trạng thái Unassigned**
 – Toàn bộ task (đang mở, in progress, review…) do người đó phụ trách ngay lập tức được gắn nhãn “Member này đã bị xóa khỏi workspace”.
 – Trường Assignee trong database được set về `null` , để người quản lý hệ thống có thể biết.
2. **Đối với nhóm sinh viên hoặc các nhóm công ty nhỏ:**
 – Sẽ có một số ràng buộc với nhau để các thành viên không xảy ra các sai lầm không đáng có như trên. Như vậy, dù là dự án quy mô lớn hay nhóm sinh viên/công ty nhỏ, hệ thống đều đảm bảo không mất dữ liệu, tạo điều kiện để phân công lại hiệu quả.
---

### Câu 7: Có giới hạn số lượng task, project hoặc member trong mỗi Workspace không? Nếu có thì mức giới hạn là gì và vì sao lại đặt ra?
Mình xin trả lời câu hỏi của bạn ABCXYZ....:

- Hiện tại, Workspaces được cung cấp hoàn toàn miễn phí và **không giới hạn** về số lượng task, project hay thành viên.
- Tuy nhiên, để chuẩn bị cho tương lai khi hệ thống có lượng người dùng lớn:
    - **Chuyển sang mô hình đa tầng:**
 – Ví dụ gói Free vẫn giữ không cho mọi người sài miễn phí nhưng sẽ có ràng buộc về số lượng mà đối tượng tạo ra.
 – Gói Trả phí vẫn sẽ có ràng buộc nhưng số lượng cung cấp sẽ cực nhiều đủ để thõa mãn được người dùng.
    - **Vì sao phải giới hạn/thu phí**
 – **Chi phí vận hành**: Khi số lượng task/project/member tăng đột biến, chi phí lưu trữ, tính toán, backup và giám sát cũng tăng lên.
 – **Bảo đảm hiệu năng**: Giới hạn ở một mức nhất định giúp duy trì tốc độ phản hồi và trải nghiệm mượt mà cho tất cả người dùng.
 – **Phát triển tính năng bền vững**: Doanh thu từ các gói trả phí sẽ tái đầu tư vào phát triển, bảo mật và hỗ trợ kỹ thuật.
---

### Câu 8: người dùng có thể tham gia nhiều Workspace cùng lúc và nếu có, giao diện có hỗ trợ chuyển đổi nhanh không?
Mình xin trả lời câu hỏi của bạn ABCXYZ....:

- Là có. Cụ thể là:
- **Tham gia đồng thời nhiều Workspace:**
    - Mỗi user có thể được mời hoặc tự tạo bao nhiêu Workspace tùy thích, khai thác song song các dự án, nhóm hoặc phòng ban khác nhau.
- **Thanh chuyển Workspace nhanh:**
    - Ở góc trên cùng bên trái, luôn có dropdown hoặc biểu tượng “Workspace switcher”.
    - Khi click vào sẽ hiện danh sách tất cả các Workspace mà user đang tham gia, kèm avatar hoặc logo nhỏ, tên rõ ràng.


