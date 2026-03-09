import React from 'react';
import './TourPage.css';
import { set } from 'zod';
import { id } from 'zod/v4/locales';


const tourData = {
    breakcrumbs: ['Du lịch', 'Trong nước', 'Miền Tây Nam Bộ', 'Phú Quốc'],
    title: 'Phú Quốc - - Thiên Đường Giải Trí Vinwonders Khu Bảo Tồn Thiên Nhiên Safari Hòn Thơm Nature Park - Vui Chơi Thỏa Thích Tại Công Viên Nước Aquatopia - Nghỉ Dưỡng 3 Sao',
    images: [
        '/tour/tour1/img1.jpg',
        '/tour/tour1/img2.jpg',
        '/tour/tour1/img3.jpg'
    ],
    originalPrice: '8.790.000đ',
    price: '8.290.000 đ',
    pricePerPerson: 'Khách',
    promotion: 'Đặt ngay để nhận được Ưu đãi giờ chót tiết kiệm thêm 500K',
    departure: 'TP. Hồ Chí Minh',
    departureDate: '06-02-2026',
    duration: '3N2D',
    seats: '2'
};

const accordionDections = [
    {
        id: 'itinerary',
        title: 'Lịch Trình Chi Tiết',
        content: 
        <div class= "itinerary-content">
            <h3>Ngày 1: TP. HỒ CHÍ MINH - PHÚ QUỐC (Ăn trưa, tối)</h3>
            <p>Quý khách tập trung tại sân bay Tân Sơn Nhất, đại diện công ty Vietravel hỗ trợ làm thủ tục đáp chuyến bay đi Phú Quốc.</p>
            <p>Đến sân bay Phú Quốc, xe và HDV đón Quý khách khởi hành tham quan:</p>
                <ul>

                    <li><strong>Nhà thờ Dương Đông:</strong> Ngôi nhà thờ mang đậm nét kiến trúc Gothic</li>
                    <li><strong>Dinh Cậu:</strong> Nơi thờ phụng Thần Biển</li>
                    <li><strong>Chợ đêm Phú Quốc:</strong> Thưởng thức các món hải sản tươi sống</li>
                </ul>
            <h3>Ngày 2: Vinwonders - Safari - Aquatopia (Ăn sáng, trưa, tối)</h3>
            <p>Sau khi dùng bữa sáng tại khách sạn, đoàn khởi hành tham quan:</p>
                <ul>
                    <li><strong>VinWonders Phú Quốc:</strong> Công viên chủ đề lớn nhất Việt Nam</li>
                    <li><strong>Safari Phú Quốc:</strong> Vườn thú hoang dã đầu tiên tại Việt Nam</li>
                    <li><strong>Aquatopia:</strong> Công viên nước với nhiều trò chơi cảm giác mạnh</li>
                </ul>
                <p>Tự do vui chơi và trải nghiệm các trò chơi hấp dẫn.</p>
                <h3>Ngày 3: Phú Quốc - TP. HCM (Ăn sáng)</h3>
                <p>Quý khách dùng điểm tâm sáng tại khách sạn, trả phòng.</p>
                <p>Xe đưa Quý khách ra sân bay Phú Quốc đáp chuyến bay về TP. HCM.</p>
                <p>Kết thúc chương trình tour, chia tay và hẹn gặp lại!</p>
        </div>
    },
    {
        id:'promotions',
        title:'Giá ưu đãi',
        content:<div class="promotions-content">
            <h3>Ưu đãi đặc biệt</h3>
            <ul>
                <li>Giảm 500.000đ cho khách đặt tour sớm (trước 7 ngày khởi hành)</li>
                <li>Tặng bảo hiểm du lịch trị giá 100.000đ/khách</li>
                <li>Miễn phí 01 em bé dưới 5 tuổi (không phát sinh thêm chi phí)</li>
                <li>Giảm 10% cho nhóm từ 10 khách trở lên</li>
            </ul>
            <h3>Bảng giá chi tiết</h3>
            <table class = "price-table" >
                <thead>
                    <th>Loại khách</th>
                    <th>Giá gốc</th>
                    <th>Giá ưu đãi</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Người lớn (từ 12 tuổi)</td>
                        <td>8.790.000đ</td>
                        <td class="hightlight-price">8.290.00đ</td>
                    </tr>
                    <tr>
                        <td>Trẻ em (5-11 tuổi)</td>
                        <td>6.500.000đ</td>
                        <td class="hightlight-price">6.100.000đ</td>
                    </tr>
                    <tr>
                        <td>Trẻ em (dưới 5 tuổi)</td>
                        <td>-</td>
                        <td class="highlight-price">Miễn phí</td>
                    </tr>
                </tbody>
            </table>
        </div>
    },
];