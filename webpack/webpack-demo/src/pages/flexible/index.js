import './index.less';
import '@/assets/libs/flexible/flexible.debug.js';
import '@/assets/libs/flexible/flexible_css.debug.js';
/*
需要开启postcss-pxtorem插件
*/
const html = `
<div class="cantainer">
        <div class="banner"></div>
        <ul class="goods">
            <li class="goods-item">
                <div class="goods-pic">
                    <img src="./assets/images/can.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-info-title line-clamp-2" style="-webkit-box-orient:vertical">现货【送皮套+钢膜+耳机】Xiaomi/小米
                        红米Note2手机note2现货现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2现货</div>
                    <div class="goods-info-price">
                        <span>双11价</span>
                        <strong>￥699.50</strong>
                        <small>(满300减150)</small>
                    </div>
                    <div class="goods-info-number">7833人正在疯抢</div>
                    <a href="##" class="goods-info-btn">马上抢！</a>
                </div>
            </li>
            <li class="goods-item">
                <div class="goods-pic">
                    <img src="./assets/images/can.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-info-title line-clamp-2" style="-webkit-box-orient:vertical">现货【送皮套+钢膜+耳机】Xiaomi/小米
                        红米Note2手机note2现货现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2现货</div>
                    <div class="goods-info-price">
                        <span>双11价</span>
                        <strong>￥699.50</strong>
                        <small>(满300减150)</small>
                    </div>
                    <div class="goods-info-number">7833人正在疯抢</div>
                    <a href="##" class="goods-info-btn">马上抢！</a>
                </div>
            </li>
            <li class="goods-item">
                <div class="goods-pic">
                    <img src="./assets/images/can.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-info-title line-clamp-2" style="-webkit-box-orient:vertical">现货【送皮套+钢膜+耳机】Xiaomi/小米
                        红米Note2手机note2现货现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2现货</div>
                    <div class="goods-info-price">
                        <span>双11价</span>
                        <strong>￥699.50</strong>
                        <small>(满300减150)</small>
                    </div>
                    <div class="goods-info-number">7833人正在疯抢</div>
                    <a href="##" class="goods-info-btn">马上抢！</a>
                </div>
            </li>
            <li class="goods-item">
                <div class="goods-pic">
                    <img src="./assets/images/can.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-info-title line-clamp-2" style="-webkit-box-orient:vertical">现货【送皮套+钢膜+耳机】Xiaomi/小米
                        红米Note2手机note2现货现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2现货</div>
                    <div class="goods-info-price">
                        <span>双11价</span>
                        <strong>￥699.50</strong>
                        <small>(满300减150)</small>
                    </div>
                    <div class="goods-info-number">7833人正在疯抢</div>
                    <a href="##" class="goods-info-btn">马上抢！</a>
                </div>
            </li>
            <li class="goods-item">
                <div class="goods-pic">
                    <img src="./assets/images/can.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-info-title line-clamp-2" style="-webkit-box-orient:vertical">现货【送皮套+钢膜+耳机】Xiaomi/小米
                        红米Note2手机note2现货现货【送皮套+钢膜+耳机】Xiaomi/小米 红米Note2手机note2现货</div>
                    <div class="goods-info-price">
                        <span>双11价</span>
                        <strong>￥699.50</strong>
                        <small>(满300减150)</small>
                    </div>
                    <div class="goods-info-number">7833人正在疯抢</div>
                    <a href="##" class="goods-info-btn">马上抢！</a>
                </div>
            </li>
        </ul>
    </div>
`;
document.getElementById('app').innerHTML = html;
