// ========================================
// かんたん発注 - シンプル版
// 商品非表示機能付き
// ========================================

// 商品データ（NeoOrderから取得）
const PRODUCTS = [
    { code: "235965", name: "ﾊﾞﾗｴﾃｨｰｳｲﾝﾅｰ5 1kg<MY>", price: "¥1,880/P", boxQty: 10 },
    { code: "149914", name: "ｶﾀﾗｰﾅ炙り 500g 花畑牧場", price: "¥1,420/P", boxQty: 24 },
    { code: "373720", name: "結び白滝 20g 1kg詰 ｴﾘｴ", price: "¥750/P", boxQty: 12 },
    { code: "195629", name: "ﾛｰﾙｷｬﾍﾞﾂ 豚肉 60g20入", price: "¥1,200/P", boxQty: 10 },
    { code: "169322", name: "ながもちF切り餅1切ﾊﾟｯｸ 1kg 前原製粉", price: "¥1,200/P", boxQty: 10 },
    { code: "323061", name: "ｸﾘｰﾑﾁｰｽﾞ ｱﾝｶｰ NZ産 1kg", price: "¥1,660/P", boxQty: 12 },
    { code: "291328", name: "南の大地ﾉﾝﾌﾗｲｸﾙﾄﾝ300g ｽﾀｰﾌｰｽﾞ", price: "¥402/P", boxQty: 20 },
    { code: "311038", name: "合鴨ｽﾓｰｸ徳用 約200g5本入 ｺｽ摩ﾌｰｽﾞ", price: "¥1,620/P", boxQty: 12 },
    { code: "373807", name: "ﾑｷｴﾋﾞﾊﾞﾅﾒｲ41/50 ﾌﾟﾘﾏ 900g2入 保水有", price: "¥2,850/B", boxQty: 6 },
    { code: "261243", name: "ONE(S)ﾎﾜｲﾄｿｰｽ 1kg", price: "¥700/P", boxQty: 6 },
    { code: "233896", name: "BASIC四川豆板醤 1kg", price: "¥900/本", boxQty: 12 },
    { code: "394682", name: "ﾚｽﾄﾗﾝﾋﾞﾈｶﾞｰ 白ﾜｲﾝﾀｲﾌﾟ 1L ﾊﾝﾀﾞｰｽ", price: "¥350/本", boxQty: 12 },
    { code: "201727", name: "ﾋﾞﾈｶﾞｰｼｪﾌ ﾊﾆｰﾏｽﾀｰﾄﾞｿｰｽ 1100g ﾐﾂｶﾝ", price: "¥540/本", boxQty: 8 },
    { code: "105062", name: "豚ﾊﾞﾗｽﾗｲｽ2mm 500g 産地不問", price: "¥780/P", boxQty: 20 },
    { code: "725604", name: "ｺﾁｼﾞｬﾝ(もち米入)1kg ﾁｮｳｼｮｸ", price: "¥850/本", boxQty: 12 },
    { code: "163607", name: "ﾌﾞﾛｯｺﾘｰ 500g IQF 中国産", price: "¥280/P", boxQty: 20 },
    { code: "372814", name: "ﾐﾗﾉ風ﾋﾟｻﾞｸﾗｽﾄ #8 70g5枚 MCC", price: "¥740/P", boxQty: 6 },
    { code: "166786", name: "ﾚﾓﾝ165玉ｻｲｽﾞ ﾁﾙﾄﾞ ﾊﾞﾗ 輸入品", price: "¥120/個", boxQty: 165 },
    { code: "151109", name: "LLﾎｲｯﾌﾟ40 緑 1L 雪印ﾒｸﾞﾐﾙｸ", price: "¥830/本", boxQty: 8 },
    { code: "121666", name: "ｶﾏﾝﾌﾗｲ 425g(25個)ﾏﾙﾊﾆﾁﾛ", price: "¥1,150/P", boxQty: 6 },
    { code: "363668", name: "ﾌｫﾝﾀﾞﾝｼｮｺﾗ 85g6入 ﾚﾝｼﾞでﾛｽなし ﾌﾚｯｸ", price: "¥1,300/B", boxQty: 16 },
    { code: "219555", name: "ﾌﾘｰｶｯﾄｹｰｷ ﾐﾙｸﾚｰﾌﾟ抹茶(京都府産宇治抹茶使用)400g ﾌﾚｯｸ", price: "¥1,580/B", boxQty: 9 },
    { code: "563254", name: "ﾌﾟﾁﾎﾟﾝﾃﾞ ｶｽﾀｰﾄﾞ 500g 30/33入", price: "¥1,070/P", boxQty: 20 },
    { code: "863423", name: "ﾌﾟﾁﾎﾟﾝﾃﾞ ﾁｮｺ 500g 30/33入", price: "¥1,080/P", boxQty: 20 },
    { code: "372963", name: "ﾐｯｸｽﾁｰｽﾞ N 1kg ﾏﾘﾝﾌｰﾄﾞ", price: "¥1,420/P", boxQty: 10 },
    { code: "253875", name: "ｼｭｰｽﾄﾘﾝｸﾞﾎﾟﾃﾄ 中国産 1㎏", price: "¥340/P", boxQty: 10 },
    { code: "641608", name: "ﾀｺ焼 20g50入 ｾｲﾘﾝｸﾞﾎﾞｰﾄ", price: "¥830/P", boxQty: 6 },
    { code: "127533", name: "合鴨ｽﾓｰｸNT 1kg ｺｽﾓﾌｰｽﾞ", price: "¥1,620/P", boxQty: 12 },
    { code: "131887", name: "ｻｻﾐの竜田揚(梅しそ巻)約27g30入 味の素", price: "¥1,660/P", boxQty: 7 },
    { code: "149874", name: "ONE(S)ﾏﾖﾈｰｽﾞ卵黄 1kg", price: "¥600/本", boxQty: 10 },
    { code: "237272", name: "BASIC片栗粉 1kg", price: "¥420/P", boxQty: 12 },
    { code: "113958", name: "ﾉﾝｵｲﾙﾄﾞﾚ 梅づくし 1L QP", price: "¥730/本", boxQty: 9 },
    { code: "372807", name: "ﾐｯｸｽﾍﾞﾘｰ 冷凍 500g ｳｨｽﾞﾒﾀｯｸﾌｰｽﾞ", price: "¥640/P", boxQty: 20 },
    { code: "644905", name: "でっかいちくわの磯辺揚げ 約57g25入 ｹｲｴｽ冷凍", price: "¥2,000/P", boxQty: 4 },
    { code: "863602", name: "ﾌﾘｰｶｯﾄｹｰｷ ﾐﾙｸﾚｰﾌﾟ 480g ﾌﾚｯｸ", price: "¥1,640/B", boxQty: 9 },
    { code: "148717", name: "生ﾊﾑﾛｰｽｽﾗｲｽ 500g ｱﾙﾃｨｼﾓﾘﾊﾞｻﾑ使用", price: "¥1,580/P", boxQty: 20 },
    { code: "197767", name: "BASIC白絞油 16.5kg缶", price: "¥5,550/缶", boxQty: 1 },
    { code: "208829", name: "ONE(S)辛子明太子(ﾊﾞﾗ子)500g", price: "¥1,330/P", boxQty: 10 },
    { code: "253795", name: "ｱｲｽｸﾘｰﾑ 抹茶 14% 2Lｽｸｴｱﾊﾟｯｸ", price: "¥1,380/P", boxQty: 9 },
    { code: "711926", name: "ﾍﾞｰｼｯｸLS ﾊﾞﾘｭｰﾊﾞﾆﾗ 4L", price: "¥1,500/P", boxQty: 3 },
    { code: "115090", name: "おろしﾆﾝﾆｸ PB 1kg", price: "¥910/本", boxQty: 12 },
    { code: "115091", name: "おろし生姜 PB 1kg", price: "¥1,000/本", boxQty: 12 },
    { code: "133233", name: "ｽｲｰﾄﾁﾘｿｰｽ 980g ﾒｰﾌﾟﾗﾅﾑ", price: "¥690/本", boxQty: 12 },
    { code: "514834", name: "ｴﾙﾄﾞﾚｼｰｻﾞｰ 1L QP", price: "¥660/本", boxQty: 9 },
    { code: "137225", name: "ﾓｯﾂｧﾚﾗ ｽﾋﾟｯﾂｨｵｰｻ 1kg 冷凍", price: "¥2,540/P", boxQty: 10 },
    { code: "151162", name: "生刻みﾆﾝﾆｸ 1kg ﾕｳｷ 中国産ﾆﾝﾆｸ使用", price: "¥920/本", boxQty: 12 },
    { code: "233989", name: "ﾊﾞｽｸﾁｰｽﾞｹｰｷ 4入 ﾚﾝｼﾞでﾛｽなし ﾌﾚｯｸ", price: "¥890/B", boxQty: 12 },
    { code: "165091", name: "ﾎｳﾚﾝ草ｶｯﾄ IQF 中国産 5cm 1kg", price: "¥480/P", boxQty: 10 },
    { code: "188216", name: "ONE(S)ﾄﾏﾄｹﾁｬｯﾌﾟﾁｭｰﾌﾞ 1kg", price: "¥410/本", boxQty: 12 },
    { code: "203577", name: "ﾁｮｺﾚｰﾄｼﾛｯﾌﾟMLS 623g ﾊｰｼｰ", price: "¥890/本", boxQty: 12 },
    { code: "235392", name: "純粋はちみつ 1kg", price: "¥760/本", boxQty: 12 },
    { code: "332652", name: "塩たれ 2kg 創味食品", price: "¥1,220/本", boxQty: 6 },
    { code: "551463", name: "生ﾁｮｺﾄﾘｭﾌ 500g", price: "¥1,840/P", boxQty: 20 },
    { code: "111360", name: "食塩 5kg 塩事業ｾﾝﾀｰ", price: "¥520/P", boxQty: 4 },
    { code: "112004", name: "ｲﾀﾘｱﾝﾄﾞﾚｯｼﾝｸﾞ 1L QP", price: "¥770/本", boxQty: 9 },
    { code: "112153", name: "いり胡麻 白 1kg 貿易", price: "¥840/P", boxQty: 12 },
    { code: "120824", name: "ﾊﾟﾙﾒｻﾞﾝﾌﾞﾚﾝﾄﾞﾊﾟｳﾀﾞｰ 1kg ｼﾞｬｺﾋﾞｱ", price: "¥2,980/P", boxQty: 10 },
    { code: "163300", name: "豚ﾐﾝﾁ 1kg IQF", price: "¥1,170/P", boxQty: 10 },
    { code: "120909", name: "ONE(S)純正ごま油 1.65kg 圧搾製法 一番搾り", price: "¥2,400/本", boxQty: 6 },
    { code: "123943", name: "ｸﾞﾗﾆｭｰ糖 ｽﾌﾟｰﾝ印 1kg", price: "¥300/P", boxQty: 20 },
    { code: "132474", name: "上白糖J ｽﾌﾟｰﾝ印 1kg", price: "¥300/P", boxQty: 20 },
    { code: "132782", name: "ｼﾞｪﾉﾍﾞｰｾﾞｿｰｽ 300g QP", price: "¥600/P", boxQty: 10 },
    { code: "141057", name: "ﾀｺ焼ｿｰｽ 2.1kg ｵﾀﾌｸ", price: "¥870/本", boxQty: 6 },
    { code: "141295", name: "唐辛子輪切 100g", price: "¥500/P", boxQty: 30 },
    { code: "142029", name: "ﾁｷﾝｺﾝｿﾒ 1kg缶 ｸﾉｰﾙ", price: "¥1,800/缶", boxQty: 6 },
    { code: "145058", name: "ﾄﾏﾄｿｰｽ #2 ｶｺﾞﾒ", price: "¥530/缶", boxQty: 12 },
    { code: "145196", name: "ﾄﾏﾄﾎｰﾙ #1", price: "¥1,090/缶", boxQty: 6 },
    { code: "148114", name: "ONE(S)ｼｰｻﾞｰｻﾗﾀﾞﾄﾞﾚｯｼﾝｸﾞ 1L", price: "¥800/本", boxQty: 8 },
    { code: "169890", name: "ONE(S)焙煎ごまﾄﾞﾚｯｼﾝｸﾞ黒酢入 1L", price: "¥620/本", boxQty: 8 },
    { code: "183136", name: "枝豆塩ゆで 中国産 500g", price: "¥250/P", boxQty: 20 },
    { code: "202248", name: "BASIC刻みのり 100g", price: "¥900/P", boxQty: 20 },
    { code: "219470", name: "BASICﾌﾞﾗｯｸﾍﾟｯﾊﾟｰ粗挽 400g", price: "¥1,320/缶", boxQty: 12 },
    { code: "219474", name: "BASICﾊﾟｾﾘｸﾞﾗﾆｭｰﾙ 80g", price: "¥700/缶", boxQty: 12 },
    { code: "236980", name: "ONE(S)ｽﾃｰｷｿｰｽ香味おろし 1L", price: "¥860/本", boxQty: 6 },
    { code: "242649", name: "ONE(S)天ぷら粉 1kg", price: "¥510/P", boxQty: 15 },
    { code: "312931", name: "糸唐辛子 50g 中国産", price: "¥590/P", boxQty: 30 },
    { code: "514915", name: "ｴﾙﾄﾞﾚ和風たまねぎ 1L QP", price: "¥640/本", boxQty: 9 },
    { code: "521982", name: "ｶﾞﾗﾑﾏｻﾗﾊﾟｳﾀﾞｰ 80g缶", price: "¥520/缶", boxQty: 6 },
    { code: "663027", name: "ﾌﾛｰｽﾞﾝﾎｲｯﾌﾟ 1L ｱｻﾋﾌｰｽﾞ", price: "¥500/P", boxQty: 20 },
    { code: "742992", name: "ﾁｪﾀﾞｰｽﾗｲｽ 20枚入 300g JUCOVIA", price: "¥740/P", boxQty: 27 },
    { code: "965248", name: "ﾎﾟﾃﾄｼｰｽﾞﾆﾝｸﾞ ﾊﾞﾀｰ醤油 350g ﾏｺｰﾐｯｸ", price: "¥850/本", boxQty: 6 },
    { code: "933530", name: "ｽﾓｰｸｻｰﾓﾝｱﾄﾗﾝｽﾗｲｽ 500g", price: "¥2,770/P", boxQty: 20 },
    { code: "373346", name: "無塩ﾊﾞﾀｰ 冷凍 450g 北海道日高乳業", price: "¥1,180/本", boxQty: 30 },
    { code: "314315", name: "EXVｵﾘｰﾌﾞｵｲﾙ 1L BESODEOLIVA", price: "¥2,400/本", boxQty: 12 }
];

// 状態管理
const state = {
    inventory: {},      // { code: { target: 0, current: 0 } }
    hiddenCodes: [],    // 非表示にした商品コード
    searchTerm: '',
    showOnlyOrders: false
};

// 保存キー
const STORAGE_KEY = 'kantan_order_v2';

// データ読み込み
function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        state.inventory = data.inventory || {};
        state.hiddenCodes = data.hiddenCodes || [];
    }
    // 新しい商品があれば初期化
    PRODUCTS.forEach(p => {
        if (!state.inventory[p.code]) {
            state.inventory[p.code] = { target: 0, current: 0 };
        }
    });
}

// データ保存
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        inventory: state.inventory,
        hiddenCodes: state.hiddenCodes
    }));
}

// 注文数を計算（いつもの数 - 今ある数、最小0）
function getOrderQty(code) {
    const inv = state.inventory[code];
    if (!inv) return 0;
    return Math.max(0, inv.target - inv.current);
}

// 商品を非表示にする
function hideProduct(code) {
    if (!state.hiddenCodes.includes(code)) {
        state.hiddenCodes.push(code);
        saveData();
        renderTable();
    }
}

// 商品を再表示する
function showProduct(code) {
    state.hiddenCodes = state.hiddenCodes.filter(c => c !== code);
    saveData();
    renderTable();
    renderHiddenList();
}

// テーブル描画
function renderTable() {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';

    let filteredProducts = PRODUCTS.filter(p => {
        // 非表示フィルター
        if (state.hiddenCodes.includes(p.code)) return false;

        // 検索フィルター
        const matchesSearch = !state.searchTerm ||
            p.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            p.code.includes(state.searchTerm);

        // 注文ありフィルター
        const hasOrder = !state.showOnlyOrders || getOrderQty(p.code) > 0;

        return matchesSearch && hasOrder;
    });

    filteredProducts.forEach(product => {
        const inv = state.inventory[product.code] || { target: 0, current: 0 };
        const orderQty = getOrderQty(product.code);

        // 注文数のスタイル決定
        let orderClass = 'no-order';
        if (orderQty > 0) orderClass = 'has-order';
        if (inv.current > inv.target && inv.target > 0) orderClass = 'over';

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <div class="product-name">${product.name}</div>
                <div class="product-code">${product.code}</div>
            </td>
            <td class="product-price">${product.price}</td>
            <td style="text-align: center;">
                <input type="number" 
                    class="qty-input" 
                    data-code="${product.code}" 
                    data-type="target"
                    value="${inv.target}" 
                    min="0" 
                    max="999"
                    placeholder="0">
            </td>
            <td style="text-align: center;">
                <input type="number" 
                    class="qty-input current" 
                    data-code="${product.code}" 
                    data-type="current"
                    value="${inv.current}" 
                    min="0" 
                    max="999"
                    placeholder="0">
            </td>
            <td style="text-align: center;">
                <span class="order-qty ${orderClass}">${orderQty}</span>
            </td>
            <td style="text-align: center;">
                <button class="btn btn-danger hide-btn" data-code="${product.code}">
                    消す
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateSummary();
    renderOrderList();
}

// サマリー更新
function updateSummary() {
    let orderItems = 0;
    let totalQty = 0;

    PRODUCTS.forEach(p => {
        // 非表示は除外
        if (state.hiddenCodes.includes(p.code)) return;

        const qty = getOrderQty(p.code);
        if (qty > 0) {
            orderItems++;
            totalQty += qty;
        }
    });

    document.getElementById('orderCount').textContent = orderItems;
    document.getElementById('totalOrderQty').textContent = totalQty;
}

// 注文リスト描画
function renderOrderList() {
    const orderList = document.getElementById('orderList');

    const orders = PRODUCTS
        .filter(p => !state.hiddenCodes.includes(p.code) && getOrderQty(p.code) > 0)
        .map(p => ({
            ...p,
            orderQty: getOrderQty(p.code),
            inv: state.inventory[p.code]
        }));

    if (orders.length === 0) {
        orderList.innerHTML = `
            <div class="empty-order">
                ✅ 注文する商品はありません
            </div>
        `;
        return;
    }

    orderList.innerHTML = orders.map(item => `
        <div class="order-card">
            <div class="order-card-info">
                <div class="order-card-name">${item.name}</div>
                <div class="order-card-detail">
                    いつも${item.inv.target}個 → 今${item.inv.current}個
                </div>
            </div>
            <div class="order-card-qty">${item.orderQty}</div>
        </div>
    `).join('');
}

// 非表示商品リスト描画
function renderHiddenList() {
    const hiddenList = document.getElementById('hiddenList');

    const hiddenProducts = PRODUCTS.filter(p => state.hiddenCodes.includes(p.code));

    if (hiddenProducts.length === 0) {
        hiddenList.innerHTML = `
            <div class="empty-hidden">
                非表示の商品はありません
            </div>
        `;
        return;
    }

    hiddenList.innerHTML = hiddenProducts.map(p => `
        <div class="hidden-item">
            <div>
                <div class="hidden-item-name">${p.name}</div>
                <div class="hidden-item-code">${p.code}</div>
            </div>
            <button class="btn btn-restore restore-btn" data-code="${p.code}">
                戻す
            </button>
        </div>
    `).join('');
}

// モーダル表示
function showModal() {
    renderHiddenList();
    document.getElementById('hiddenModal').classList.remove('hidden');
}

// モーダル非表示
function hideModal() {
    document.getElementById('hiddenModal').classList.add('hidden');
}

// CSV出力（注文ありのみ）
function exportCSV() {
    const orders = PRODUCTS
        .filter(p => !state.hiddenCodes.includes(p.code) && getOrderQty(p.code) > 0)
        .map(p => ({
            ...p,
            orderQty: getOrderQty(p.code),
            inv: state.inventory[p.code]
        }));

    if (orders.length === 0) {
        alert('注文する商品がありません');
        return;
    }

    // ヘッダー
    const headers = ['商品コード', '商品名', '値段', 'いつもの数', '今ある数', '注文する数'];

    // データ行
    const rows = orders.map(item => [
        item.code,
        `"${item.name}"`,
        item.price,
        item.inv.target,
        item.inv.current,
        item.orderQty
    ].join(','));

    // CSV作成
    const csv = [headers.join(','), ...rows].join('\n');

    // BOM付きでExcel対応
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });

    // ダウンロード
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `注文リスト_${date}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
}

// 現在庫リセット
function resetCurrentInventory() {
    if (!confirm('今ある数をすべて0にしますか？\n（いつもの数はそのままです）')) {
        return;
    }

    PRODUCTS.forEach(p => {
        if (state.inventory[p.code]) {
            state.inventory[p.code].current = 0;
        }
    });

    saveData();
    renderTable();
}

// イベント設定
function setupEventListeners() {
    // 数値入力
    document.getElementById('productTableBody').addEventListener('input', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const code = e.target.dataset.code;
            const type = e.target.dataset.type;
            const value = parseInt(e.target.value) || 0;

            if (!state.inventory[code]) {
                state.inventory[code] = { target: 0, current: 0 };
            }
            state.inventory[code][type] = value;

            saveData();

            // 注文数更新
            const row = e.target.closest('tr');
            const orderQtySpan = row.querySelector('.order-qty');
            const newOrderQty = getOrderQty(code);
            const inv = state.inventory[code];

            let orderClass = 'no-order';
            if (newOrderQty > 0) orderClass = 'has-order';
            if (inv.current > inv.target && inv.target > 0) orderClass = 'over';

            orderQtySpan.textContent = newOrderQty;
            orderQtySpan.className = `order-qty ${orderClass}`;

            updateSummary();
            renderOrderList();
        }
    });

    // 非表示ボタン
    document.getElementById('productTableBody').addEventListener('click', (e) => {
        if (e.target.classList.contains('hide-btn')) {
            const code = e.target.dataset.code;
            hideProduct(code);
        }
    });

    // 復元ボタン（モーダル内）
    document.getElementById('hiddenList').addEventListener('click', (e) => {
        if (e.target.classList.contains('restore-btn')) {
            const code = e.target.dataset.code;
            showProduct(code);
        }
    });

    // 検索
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchTerm = e.target.value;
        renderTable();
    });

    // フィルター
    document.getElementById('showOnlyOrders').addEventListener('change', (e) => {
        state.showOnlyOrders = e.target.checked;
        renderTable();
    });

    // エクスポート
    document.getElementById('exportBtn').addEventListener('click', exportCSV);

    // リセット
    document.getElementById('resetCurrentBtn').addEventListener('click', resetCurrentInventory);

    // モーダル表示
    document.getElementById('showHiddenBtn').addEventListener('click', showModal);

    // モーダル閉じる
    document.getElementById('closeModalBtn').addEventListener('click', hideModal);

    // モーダル背景クリックで閉じる
    document.getElementById('hiddenModal').addEventListener('click', (e) => {
        if (e.target.id === 'hiddenModal') {
            hideModal();
        }
    });
}

// 初期化
function init() {
    loadData();
    renderTable();
    setupEventListeners();
}

// スタート
document.addEventListener('DOMContentLoaded', init);
