# **Tài liệu phân tích thiết kế hệ thống**

## Đề Tài: Website đặt tour du lịch

### Đối tượng sử dụng của  website về đặt tour du lịch

Đối tượng sử dụng của website đặt tour du lịch rất đa dạng, bao gồm nhiều nhóm người dùng khác nhau với đặc điểm và nhu cầu riêng biệt. Trước hết là nhóm khách du lịch cá nhân và hộ gia đình. Đây là nhóm người dùng chiếm tỷ lệ lớn, thường có nhu cầu tìm kiếm thông tin về điểm đến, lịch trình tour, chi phí, dịch vụ đi kèm cũng như các chương trình khuyến mãi. Nhóm đối tượng này ưu tiên sự tiện lợi, nhanh chóng trong việc tra cứu thông tin và đặt tour trực tuyến. Do đó, website cần được thiết kế với giao diện trực quan, nội dung trình bày rõ ràng, hình ảnh sinh động và quy trình đặt tour đơn giản, giúp người dùng dễ dàng đưa ra quyết định và hoàn tất giao dịch.

Bên cạnh đó, website còn phục vụ nhóm khách du lịch theo đoàn, bao gồm các cơ quan, doanh nghiệp, trường học hoặc các tổ chức xã hội. Nhóm đối tượng này thường có nhu cầu tổ chức các chuyến du lịch tập thể với số lượng lớn người tham gia, yêu cầu lịch trình linh hoạt, dịch vụ trọn gói và mức chi phí hợp lý. Đối với nhóm này, website cần cung cấp đầy đủ thông tin về các tour dành cho đoàn, chính sách ưu đãi, khả năng tùy chỉnh chương trình theo yêu cầu cũng như các kênh liên hệ trực tiếp với bộ phận tư vấn để hỗ trợ và trao đổi chi tiết.

Ngoài ra, khách du lịch quốc tế cũng là một đối tượng sử dụng quan trọng của website đặt tour du lịch. Nhóm người dùng này có nhu cầu tìm hiểu thông tin về điểm đến, văn hóa, phong tục tập quán, điều kiện thời tiết, thủ tục visa và các dịch vụ hỗ trợ khi du lịch tại Việt Nam hoặc các quốc gia khác. Website cần đáp ứng yêu cầu về đa ngôn ngữ, thông tin chính xác và cập nhật, đồng thời hỗ trợ các hình thức thanh toán quốc tế nhằm tạo sự thuận tiện và tin cậy cho người dùng nước ngoài.

Không chỉ phục vụ khách hàng, website đặt tour du lịch còn là công cụ làm việc quan trọng đối với đội ngũ nhân viên và bộ phận quản trị của doanh nghiệp du lịch. Nhóm đối tượng này sử dụng website để quản lý thông tin tour, cập nhật giá cả, theo dõi tình trạng đặt tour, xử lý đơn hàng và chăm sóc khách hàng. Vì vậy, hệ thống quản trị cần được thiết kế khoa học, bảo mật cao, dễ sử dụng và hỗ trợ hiệu quả cho công tác vận hành, góp phần nâng cao chất lượng dịch vụ và hiệu quả kinh doanh của doanh nghiệp.

Nhìn chung, việc xác định rõ đối tượng sử dụng giúp website đặt tour du lịch đáp ứng tốt hơn nhu cầu của từng nhóm người dùng, từ đó nâng cao trải nghiệm, tăng mức độ hài lòng của khách hàng và góp phần xây dựng hình ảnh chuyên nghiệp cho doanh nghiệp trong lĩnh vực du lịch.

## Phân tích tổng quan chức năng hệ thống

### 1. Nhóm chức năng **Tài khoản người dùng**

#### Đăng ký

Cho phép người dùng tạo tài khoản mới để sử dụng hệ thống.

Người dùng nhập các thông tin cơ bản như họ tên, email, mật khẩu.

Hệ thống kiểm tra dữ liệu hợp lệ và lưu thông tin vào cơ sở dữ liệu.

---

#### Đăng nhập

Cho phép người dùng truy cập vào hệ thống bằng tài khoản đã đăng ký.

Hệ thống xác thực email và mật khẩu, nếu đúng thì cho phép người dùng sử dụng các chức năng như đặt tour và thanh toán.

---

### 2. Nhóm chức năng **Quản lý tour**

#### Xem danh sách tour

Người dùng có thể xem danh sách các tour du lịch đang được cung cấp.

Mỗi tour hiển thị các thông tin cơ bản như tên tour, giá, thời gian và địa điểm.

---

#### Xem chi tiết tour

Người dùng xem thông tin chi tiết của một tour, bao gồm mô tả, lịch trình, giá và ngày khởi hành.

---

#### Quản lý tour (Admin)

Quản trị viên có thể thêm mới, chỉnh sửa hoặc xoá tour du lịch để cập nhật thông tin các tour trong hệ thống.

---

### 3. Nhóm chức năng **Đặt tour**

#### Đặt tour

Sau khi đăng nhập, người dùng chọn một tour và nhập số lượng người tham gia cùng ngày khởi hành.

Hệ thống tạo một đơn đặt tour và lưu thông tin vào cơ sở dữ liệu.

---

#### Xem lịch sử đặt tour

Người dùng có thể xem danh sách các tour đã đặt, bao gồm thông tin tour, ngày đặt và trạng thái đơn hàng.

---

### 4. Nhóm chức năng **Thanh toán (giả lập)**

#### Thanh toán

Người dùng thực hiện thanh toán cho đơn đặt tour.

Hệ thống không xử lý giao dịch thật mà chỉ cập nhật trạng thái đơn đặt tour thành “đã thanh toán”.

---

#### Quản lý trạng thái thanh toán

Hệ thống quản lý các trạng thái của đơn đặt tour như:

* Chờ thanh toán
* Đã thanh toán
* Đã huỷ

Giúp người dùng và quản trị viên theo dõi tình trạng các đơn đặt tour.
