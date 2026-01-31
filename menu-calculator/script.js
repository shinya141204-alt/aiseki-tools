// ========================================
// 原価計算ツール - NeoOrderデータ統合版
// ========================================

// NeoOrder商品マスターデータ（かんたん発注と共有）
const NEOORDER_PRODUCTS = [
    { code: "235965", name: "ﾊﾞﾗｴﾃｨｰｳｲﾝﾅｰ5 1kg", price: 1880, amount: 1000, unit: "g" },
    { code: "149914", name: "ｶﾀﾗｰﾅ炙り 500g", price: 1420, amount: 500, unit: "g" },
    { code: "373720", name: "結び白滝 1kg詰", price: 750, amount: 1000, unit: "g" },
    { code: "195629", name: "ﾛｰﾙｷｬﾍﾞﾂ 豚肉 60g×20入", price: 1200, amount: 20, unit: "個" },
    { code: "169322", name: "切り餅 1kg", price: 1200, amount: 1000, unit: "g" },
    { code: "323061", name: "ｸﾘｰﾑﾁｰｽﾞ 1kg", price: 1660, amount: 1000, unit: "g" },
    { code: "291328", name: "ﾉﾝﾌﾗｲｸﾙﾄﾝ 300g", price: 402, amount: 300, unit: "g" },
    { code: "311038", name: "合鴨ｽﾓｰｸ徳用 約200g×5本", price: 1620, amount: 1000, unit: "g" },
    { code: "373807", name: "ﾑｷｴﾋﾞﾊﾞﾅﾒｲ 900g×2入", price: 2850, amount: 1800, unit: "g" },
    { code: "261243", name: "ﾎﾜｲﾄｿｰｽ 1kg", price: 700, amount: 1000, unit: "g" },
    { code: "233896", name: "四川豆板醤 1kg", price: 900, amount: 1000, unit: "g" },
    { code: "394682", name: "白ﾜｲﾝﾋﾞﾈｶﾞｰ 1L", price: 350, amount: 1000, unit: "ml" },
    { code: "201727", name: "ﾊﾆｰﾏｽﾀｰﾄﾞｿｰｽ 1100g", price: 540, amount: 1100, unit: "g" },
    { code: "105062", name: "豚ﾊﾞﾗｽﾗｲｽ2mm 500g", price: 780, amount: 500, unit: "g" },
    { code: "725604", name: "ｺﾁｼﾞｬﾝ 1kg", price: 850, amount: 1000, unit: "g" },
    { code: "163607", name: "ﾌﾞﾛｯｺﾘｰ 500g", price: 280, amount: 500, unit: "g" },
    { code: "372814", name: "ﾋﾟｻﾞｸﾗｽﾄ 70g×5枚", price: 740, amount: 5, unit: "枚" },
    { code: "166786", name: "ﾚﾓﾝ 1個", price: 120, amount: 1, unit: "個" },
    { code: "151109", name: "ﾎｲｯﾌﾟｸﾘｰﾑ 1L", price: 830, amount: 1000, unit: "ml" },
    { code: "121666", name: "ｶﾏﾝﾌﾗｲ 425g(25個)", price: 1150, amount: 25, unit: "個" },
    { code: "363668", name: "ﾌｫﾝﾀﾞﾝｼｮｺﾗ 85g×6入", price: 1300, amount: 6, unit: "個" },
    { code: "219555", name: "ﾐﾙｸﾚｰﾌﾟ抹茶 400g", price: 1580, amount: 400, unit: "g" },
    { code: "563254", name: "ﾌﾟﾁﾎﾟﾝﾃﾞ ｶｽﾀｰﾄﾞ 500g", price: 1070, amount: 30, unit: "個" },
    { code: "863423", name: "ﾌﾟﾁﾎﾟﾝﾃﾞ ﾁｮｺ 500g", price: 1080, amount: 30, unit: "個" },
    { code: "372963", name: "ﾐｯｸｽﾁｰｽﾞ 1kg", price: 1420, amount: 1000, unit: "g" },
    { code: "253875", name: "ｼｭｰｽﾄﾘﾝｸﾞﾎﾟﾃﾄ 1kg", price: 340, amount: 1000, unit: "g" },
    { code: "641608", name: "ﾀｺ焼 20g×50入", price: 830, amount: 50, unit: "個" },
    { code: "127533", name: "合鴨ｽﾓｰｸNT 1kg", price: 1620, amount: 1000, unit: "g" },
    { code: "131887", name: "ｻｻﾐ竜田揚(梅しそ)27g×30入", price: 1660, amount: 30, unit: "個" },
    { code: "149874", name: "ﾏﾖﾈｰｽﾞ卵黄 1kg", price: 600, amount: 1000, unit: "g" },
    { code: "237272", name: "片栗粉 1kg", price: 420, amount: 1000, unit: "g" },
    { code: "113958", name: "ﾉﾝｵｲﾙ梅ﾄﾞﾚ 1L", price: 730, amount: 1000, unit: "ml" },
    { code: "372807", name: "ﾐｯｸｽﾍﾞﾘｰ 500g", price: 640, amount: 500, unit: "g" },
    { code: "644905", name: "ちくわ磯辺揚げ 57g×25入", price: 2000, amount: 25, unit: "個" },
    { code: "863602", name: "ﾐﾙｸﾚｰﾌﾟ 480g", price: 1640, amount: 480, unit: "g" },
    { code: "148717", name: "生ﾊﾑﾛｰｽ 500g", price: 1580, amount: 500, unit: "g" },
    { code: "197767", name: "白絞油 16.5kg", price: 5550, amount: 16500, unit: "g" },
    { code: "208829", name: "辛子明太子 500g", price: 1330, amount: 500, unit: "g" },
    { code: "253795", name: "抹茶アイス 2L", price: 1380, amount: 2000, unit: "ml" },
    { code: "711926", name: "ﾊﾞﾆﾗｱｲｽ 4L", price: 1500, amount: 4000, unit: "ml" },
    { code: "115090", name: "おろしﾆﾝﾆｸ 1kg", price: 910, amount: 1000, unit: "g" },
    { code: "115091", name: "おろし生姜 1kg", price: 1000, amount: 1000, unit: "g" },
    { code: "133233", name: "ｽｲｰﾄﾁﾘｿｰｽ 980g", price: 690, amount: 980, unit: "g" },
    { code: "514834", name: "ｼｰｻﾞｰﾄﾞﾚ 1L", price: 660, amount: 1000, unit: "ml" },
    { code: "137225", name: "ﾓｯﾂｧﾚﾗﾁｰｽﾞ 1kg", price: 2540, amount: 1000, unit: "g" },
    { code: "151162", name: "刻みﾆﾝﾆｸ 1kg", price: 920, amount: 1000, unit: "g" },
    { code: "233989", name: "ﾊﾞｽｸﾁｰｽﾞｹｰｷ 4入", price: 890, amount: 4, unit: "個" },
    { code: "165091", name: "ﾎｳﾚﾝ草ｶｯﾄ 1kg", price: 480, amount: 1000, unit: "g" },
    { code: "188216", name: "ﾄﾏﾄｹﾁｬｯﾌﾟ 1kg", price: 410, amount: 1000, unit: "g" },
    { code: "203577", name: "ﾁｮｺﾚｰﾄｼﾛｯﾌﾟ 623g", price: 890, amount: 623, unit: "g" },
    { code: "235392", name: "はちみつ 1kg", price: 760, amount: 1000, unit: "g" },
    { code: "332652", name: "塩たれ 2kg", price: 1220, amount: 2000, unit: "g" },
    { code: "551463", name: "生ﾁｮｺﾄﾘｭﾌ 500g", price: 1840, amount: 500, unit: "g" },
    { code: "111360", name: "食塩 5kg", price: 520, amount: 5000, unit: "g" },
    { code: "112004", name: "ｲﾀﾘｱﾝﾄﾞﾚｯｼﾝｸﾞ 1L", price: 770, amount: 1000, unit: "ml" },
    { code: "112153", name: "いり胡麻 白 1kg", price: 840, amount: 1000, unit: "g" },
    { code: "120824", name: "ﾊﾟﾙﾒｻﾞﾝﾁｰｽﾞ 1kg", price: 2980, amount: 1000, unit: "g" },
    { code: "163300", name: "豚ﾐﾝﾁ 1kg", price: 1170, amount: 1000, unit: "g" },
    { code: "120909", name: "ごま油 1.65kg", price: 2400, amount: 1650, unit: "g" },
    { code: "123943", name: "ｸﾞﾗﾆｭｰ糖 1kg", price: 300, amount: 1000, unit: "g" },
    { code: "132474", name: "上白糖 1kg", price: 300, amount: 1000, unit: "g" },
    { code: "132782", name: "ｼﾞｪﾉﾍﾞｰｾﾞｿｰｽ 300g", price: 600, amount: 300, unit: "g" },
    { code: "141057", name: "ﾀｺ焼ｿｰｽ 2.1kg", price: 870, amount: 2100, unit: "g" },
    { code: "141295", name: "唐辛子輪切 100g", price: 500, amount: 100, unit: "g" },
    { code: "142029", name: "ﾁｷﾝｺﾝｿﾒ 1kg", price: 1800, amount: 1000, unit: "g" },
    { code: "145058", name: "ﾄﾏﾄｿｰｽ 缶", price: 530, amount: 840, unit: "g" },
    { code: "145196", name: "ﾄﾏﾄﾎｰﾙ 缶", price: 1090, amount: 2500, unit: "g" },
    { code: "148114", name: "ｼｰｻﾞｰｻﾗﾀﾞﾄﾞﾚ 1L", price: 800, amount: 1000, unit: "ml" },
    { code: "169890", name: "焙煎ごまﾄﾞﾚ黒酢入 1L", price: 620, amount: 1000, unit: "ml" },
    { code: "183136", name: "枝豆塩ゆで 500g", price: 250, amount: 500, unit: "g" },
    { code: "202248", name: "刻みのり 100g", price: 900, amount: 100, unit: "g" },
    { code: "219470", name: "ﾌﾞﾗｯｸﾍﾟｯﾊﾟｰ粗挽 400g", price: 1320, amount: 400, unit: "g" },
    { code: "219474", name: "ﾊﾟｾﾘｸﾞﾗﾆｭｰﾙ 80g", price: 700, amount: 80, unit: "g" },
    { code: "236980", name: "ｽﾃｰｷｿｰｽ香味おろし 1L", price: 860, amount: 1000, unit: "ml" },
    { code: "242649", name: "天ぷら粉 1kg", price: 510, amount: 1000, unit: "g" },
    { code: "312931", name: "糸唐辛子 50g", price: 590, amount: 50, unit: "g" },
    { code: "514915", name: "和風たまねぎﾄﾞﾚ 1L", price: 640, amount: 1000, unit: "ml" },
    { code: "521982", name: "ｶﾞﾗﾑﾏｻﾗ 80g", price: 520, amount: 80, unit: "g" },
    { code: "663027", name: "ﾌﾛｰｽﾞﾝﾎｲｯﾌﾟ 1L", price: 500, amount: 1000, unit: "ml" },
    { code: "742992", name: "ﾁｪﾀﾞｰｽﾗｲｽ 300g", price: 740, amount: 20, unit: "枚" },
    { code: "965248", name: "ﾎﾟﾃﾄｼｰｽﾞﾆﾝｸﾞ ﾊﾞﾀｰ醤油 350g", price: 850, amount: 350, unit: "g" },
    { code: "933530", name: "ｽﾓｰｸｻｰﾓﾝ 500g", price: 2770, amount: 500, unit: "g" },
    { code: "373346", name: "無塩ﾊﾞﾀｰ 450g", price: 1180, amount: 450, unit: "g" },
    { code: "314315", name: "EXVｵﾘｰﾌﾞｵｲﾙ 1L", price: 2400, amount: 1000, unit: "ml" }
];

// Data Storage
let ingredients = JSON.parse(localStorage.getItem('menu_ingredients')) || [];
let currentRecipe = [];

// DOM Elements
const views = {
    calculator: document.getElementById('calculator'),
    ingredients: document.getElementById('ingredients'),
    catalog: document.getElementById('catalog')
};
const tabs = document.querySelectorAll('.tab-btn');
const ingredientForm = document.getElementById('ingredient-form');
const ingredientsList = document.getElementById('ingredients-list');
const ingredientSearch = document.getElementById('ingredient-search');

const recipeList = document.getElementById('recipe-ingredients-list');
const addRowBtn = document.getElementById('add-ingredient-row-btn');
const totalCostEl = document.getElementById('total-cost');
const sellingPriceInput = document.getElementById('selling-price');
const costPercentageEl = document.getElementById('cost-percentage');
const resetBtn = document.getElementById('reset-recipe-btn');

const modal = document.getElementById('ingredient-modal');
const modalList = document.getElementById('modal-ingredient-list');
const modalSearch = document.getElementById('modal-search');
const closeModal = document.querySelector('.close-modal');

// Catalog elements
const catalogList = document.getElementById('catalog-list');
const catalogSearch = document.getElementById('catalog-search');

// Init
function init() {
    renderIngredients();
    renderCatalog();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Tabs
    tabs.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Ingredient Management
    ingredientForm.addEventListener('submit', handleAddIngredient);
    ingredientSearch.addEventListener('input', (e) => renderIngredients(e.target.value));

    // Calculator
    addRowBtn.addEventListener('click', openIngredientModal);
    recipeList.addEventListener('input', calculateCost);
    recipeList.addEventListener('click', handleRecipeListClick);
    sellingPriceInput.addEventListener('input', calculateCost);
    resetBtn.addEventListener('click', resetRecipe);

    // Modal
    closeModal.addEventListener('click', () => modal.classList.remove('open'));
    modalSearch.addEventListener('input', (e) => renderModalIngredients(e.target.value));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });

    // Catalog search
    if (catalogSearch) {
        catalogSearch.addEventListener('input', (e) => renderCatalog(e.target.value));
    }
}

// Tabs Logic
function switchTab(tabName) {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    Object.values(views).forEach(el => {
        if (el) el.classList.remove('active');
    });
    if (views[tabName]) views[tabName].classList.add('active');
}

// Ingredient Logic
function handleAddIngredient(e) {
    e.preventDefault();
    const name = document.getElementById('ing-name').value;
    const price = parseFloat(document.getElementById('ing-price').value);
    const amount = document.getElementById('ing-amount').value;
    const amountVal = parseFloat(amount);
    const unit = document.getElementById('ing-unit').value;

    if (!name || isNaN(price) || isNaN(amountVal)) {
        alert('全ての項目を正しく入力してください。');
        return;
    }

    const newIng = {
        id: Date.now().toString(),
        name,
        price,
        amount: amountVal,
        unit,
        isCustom: true
    };

    ingredients.push(newIng);
    saveIngredients();
    renderIngredients();
    e.target.reset();
}

function deleteIngredient(id) {
    if (confirm('この材料を削除しますか？')) {
        ingredients = ingredients.filter(i => i.id !== id);
        saveIngredients();
        renderIngredients();
    }
}

function saveIngredients() {
    localStorage.setItem('menu_ingredients', JSON.stringify(ingredients));
}

function renderIngredients(filter = '') {
    ingredientsList.innerHTML = '';
    const filtered = ingredients.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
        ingredientsList.innerHTML = '<li class="empty-state">登録済みの材料がありません</li>';
        return;
    }

    filtered.forEach(ing => {
        const costPerUnit = (ing.price / ing.amount).toFixed(2);
        const li = document.createElement('li');
        li.className = 'item-row';
        li.innerHTML = `
            <div class="item-info">
                <h4>${ing.name}</h4>
                <p>¥${ing.price} / ${ing.amount}${ing.unit} (@¥${costPerUnit}/${ing.unit})</p>
            </div>
            <button class="delete-btn" onclick="deleteIngredient('${ing.id}')">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        ingredientsList.appendChild(li);
    });
}

// Catalog (NeoOrder Products)
function renderCatalog(filter = '') {
    if (!catalogList) return;

    catalogList.innerHTML = '';
    const filtered = NEOORDER_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.code.includes(filter)
    );

    filtered.forEach(product => {
        const costPerUnit = (product.price / product.amount).toFixed(2);
        const li = document.createElement('li');
        li.className = 'item-row catalog-item';
        li.innerHTML = `
            <div class="item-info">
                <h4>${product.name}</h4>
                <p>¥${product.price} / ${product.amount}${product.unit} (@¥${costPerUnit}/${product.unit})</p>
            </div>
            <button class="add-catalog-btn" data-code="${product.code}">
                <i class="fa-solid fa-plus"></i> 追加
            </button>
        `;
        li.querySelector('.add-catalog-btn').addEventListener('click', () => addCatalogToIngredients(product));
        catalogList.appendChild(li);
    });
}

function addCatalogToIngredients(product) {
    // Check if already added
    const exists = ingredients.find(i => i.code === product.code);
    if (exists) {
        alert('この商品は既に登録されています');
        return;
    }

    const newIng = {
        id: Date.now().toString(),
        code: product.code,
        name: product.name,
        price: product.price,
        amount: product.amount,
        unit: product.unit,
        isFromCatalog: true
    };

    ingredients.push(newIng);
    saveIngredients();
    renderIngredients();
    alert(`「${product.name}」を材料に追加しました`);
}

// Calculator Logic
function openIngredientModal() {
    modal.classList.add('open');
    renderModalIngredients();
    modalSearch.value = '';
    modalSearch.focus();
}

function renderModalIngredients(filter = '') {
    modalList.innerHTML = '';

    // Combine registered ingredients and catalog
    const allIngredients = [
        ...ingredients,
        ...NEOORDER_PRODUCTS.filter(p => !ingredients.find(i => i.code === p.code))
            .map(p => ({ ...p, id: `neo_${p.code}` }))
    ];

    const filtered = allIngredients.filter(i =>
        i.name.toLowerCase().includes(filter.toLowerCase()) ||
        (i.code && i.code.includes(filter))
    );

    filtered.forEach(ing => {
        const li = document.createElement('li');
        li.className = 'item-row';
        const isCatalog = ing.id.toString().startsWith('neo_');
        li.innerHTML = `
            <div class="item-info">
                <h4>${ing.name} ${isCatalog ? '<span class="catalog-badge">カタログ</span>' : ''}</h4>
                <p>¥${ing.price} / ${ing.amount}${ing.unit}</p>
            </div>
            <i class="fa-solid fa-plus" style="color:var(--text-main)"></i>
        `;
        li.addEventListener('click', () => addToRecipe(ing));
        modalList.appendChild(li);
    });
}

function addToRecipe(ingredient) {
    modal.classList.remove('open');

    const div = document.createElement('div');
    div.className = 'recipe-item-row';
    div.dataset.id = ingredient.id;
    div.dataset.price = ingredient.price;
    div.dataset.baseAmount = ingredient.amount;

    div.innerHTML = `
        <div class="recipe-item-name">${ingredient.name}</div>
        <input type="number" class="recipe-item-input" placeholder="0" step="any">
        <div class="recipe-item-unit">${ingredient.unit}</div>
    `;

    const delBtn = document.createElement('button');
    delBtn.className = 'remove-row-btn';
    delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    div.appendChild(delBtn);

    const emptyState = recipeList.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    recipeList.appendChild(div);
    div.querySelector('input').focus();

    calculateCost();
}

function handleRecipeListClick(e) {
    if (e.target.closest('.remove-row-btn')) {
        e.target.closest('.recipe-item-row').remove();
        calculateCost();

        if (recipeList.children.length === 0) {
            recipeList.innerHTML = '<div class="empty-state">材料を追加してください</div>';
        }
    }
}

function calculateCost() {
    let total = 0;
    const rows = recipeList.querySelectorAll('.recipe-item-row');

    rows.forEach(row => {
        const price = parseFloat(row.dataset.price);
        const baseAmount = parseFloat(row.dataset.baseAmount);
        const inputV = row.querySelector('input').value;
        const useAmount = inputV ? parseFloat(inputV) : 0;

        const cost = (price / baseAmount) * useAmount;
        total += cost;
    });

    totalCostEl.textContent = `¥${Math.round(total)}`;

    const sellPrice = parseFloat(sellingPriceInput.value);
    if (sellPrice && sellPrice > 0) {
        const percent = (total / sellPrice) * 100;
        costPercentageEl.textContent = `${percent.toFixed(1)}%`;

        if (percent > 35) costPercentageEl.style.color = '#ff4d4d';
        else if (percent < 20) costPercentageEl.style.color = '#28a745';
        else costPercentageEl.style.color = 'var(--text-main)';
    } else {
        costPercentageEl.textContent = '0.0%';
        costPercentageEl.style.color = 'var(--text-muted)';
    }
}

function resetRecipe() {
    if (confirm('現在のレシピをリセットしますか？')) {
        recipeList.innerHTML = '<div class="empty-state">材料を追加してください</div>';
        document.getElementById('menu-name').value = '';
        sellingPriceInput.value = '';
        calculateCost();
    }
}

// Global expose for onclick events
window.deleteIngredient = deleteIngredient;

// Start
init();
