import React, { useEffect, useState } from 'react';
import './historyPage.css';

const historyPage = ({}) => {

    return(
        <div class="container-history">
        <div class="main-content">
            <h1>Nhật ký xem</h1>
            <h2>Hôm nay</h2>
            <div class="video-item">
                <img alt="Fairy Tail - Nhiệm vụ 100 năm - Tập 24 [Việt sub]" height="94" src="https://storage.googleapis.com/a1aa/image/01y0B7RQmbZvOVMejAq48tRsf3ik96LetolVIe60bXMVvp1PB.jpg" width="168"/>
                <div class="video-info">
                    <h3>Fairy Tail - Nhiệm vụ 100 năm - Tập 24 [Việt sub]</h3>
                    <p>Muse Việt Nam • 10 N lượt xem</p>
                    <p>Danh sách phát đầy đủ các tập: https://www.youtube.com/playlist?list=PLdM751AKK4aN6zH2fnfJBG9cByDFjR6UW フェアリーテイル</p>
                </div>
                <div class="video-actions">
                    <span class="time">23:51</span>
                    <i class="fas fa-times"></i>
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>
            <div class="video-item">
                <img alt="TẤT TẦN TẬT VỀ BROADCAST 2.0!! - 2 NHÂN VẬT &amp; TRANG..." height="94" src="https://storage.googleapis.com/a1aa/image/Yt7QzSLSeRzbISQYuOIJ4zxKLQoHdmHxcNXGmVTuleo3ba9TA.jpg" width="168"/>
                <div class="video-info">
                    <h3>TẤT TẦN TẬT VỀ BROADCAST 2.0!! - 2 NHÂN VẬT &amp; TRANG...</h3>
                    <p>MsicB • 790 lượt xem</p>
                    <p>- Nếu thấy hữu ích bạn chỉ cần ủng hộ mình bằng cách thả 1 like &amp; subscribe nha !!!...</p>
                </div>
                <div class="video-actions">
                    <span class="time">14:04</span>
                    <i class="fas fa-times"></i>
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>
            <div class="video-item">
                <img alt="This song SHUT me DOWN! First time Reaction to BLACKPINK -..." height="94" src="https://storage.googleapis.com/a1aa/image/M7C77oafKzUGVCbsa57OVJwqHGNgXJWLa3PtPQvv32r8NteTA.jpg" width="168"/>
                <div class="video-info">
                    <h3>This song SHUT me DOWN! First time Reaction to BLACKPINK -...</h3>
                    <p>NAMEBER1 • 403 lượt xem</p>
                    <p>Original Link to MV: https://www.youtube.com/watch?v=POe9SOEKotk DISCLOSURE: This video features a musical...</p>
                </div>
                <div class="video-actions">
                    <span class="time">9:15</span>
                    <i class="fas fa-times"></i>
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <input placeholder="Tìm kiếm trong danh sách video ..." type="text"/>
            <ul>
                <li><i class="fas fa-trash-alt"></i>Xóa tất cả nhật ký xem</li>
                <li><i class="fas fa-pause"></i>Tạm dừng lưu nhật ký xem</li>
                <li><i class="fas fa-cog"></i>Quản lý toàn bộ lịch sử hoạt động</li>
                <li>Bình luận</li>
                <li>Bài đăng</li>
                <li>Trò chuyện trực tiếp</li>
            </ul>
        </div>
        </div>
    );
};

export default historyPage;