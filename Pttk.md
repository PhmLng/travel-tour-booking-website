# **Tài liệu phân tích thiết kế hệ thống**

# Đề Tài: Website đặt tour du lịch

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
