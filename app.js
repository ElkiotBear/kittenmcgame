// grab a couple of things we need
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 9;

// link total live text
playerLivesCount.textContent = playerLives;

// create a function ---- generate all img object生成所有图片的数据
const getData = () => [
    { imgSrc: "./images/angrycat.jpg", name: "angrycat" },
    { imgSrc: "./images/blackcat.jpg", name: "blackcat" },
    { imgSrc: "./images/crycat.jpg", name: "crycat" },
    { imgSrc: "./images/fatcat.jpg", name: "fatcat" },
    { imgSrc: "./images/greycat.jpg", name: "greycat" },
    { imgSrc: "./images/orangecat.jpg", name: "orangecat" },
    { imgSrc: "./images/smallcat.jpg", name: "smallcat" },
    { imgSrc: "./images/whitecat.jpg", name: "whitecat" },
    { imgSrc: "./images/angrycat.jpg", name: "angrycat" },
    { imgSrc: "./images/blackcat.jpg", name: "blackcat" },
    { imgSrc: "./images/crycat.jpg", name: "crycat" },
    { imgSrc: "./images/fatcat.jpg", name: "fatcat" },
    { imgSrc: "./images/greycat.jpg", name: "greycat" },
    { imgSrc: "./images/orangecat.jpg", name: "orangecat" },
    { imgSrc: "./images/smallcat.jpg", name: "smallcat" },
    { imgSrc: "./images/whitecat.jpg", name: "whitecat" },
];

// create a function ---- randomize all cards 让图片全部随意重组
const randomize = () =>{
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// create a function ---- generate html elements for cards 生成所有图片的html部分
const cardGenerator = () => {
    const cardData = randomize();
    // generate the html 生成html
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        // attach the info to the cards 连接所有图片的资源 然后每张卡在点击后都有特定的名称
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        // attach cards to the section 将所有卡片放进section里面 每张卡片为一个div 里面有正面和反面
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        // 点击卡片这个div的时候 增加一个class叫做togglecard 执行css命令
        card.addEventListener("click", (e) =>{
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};

// create a function ---- check flipped cards 看看两个卡片是否相同 flipped只用来confirm两张卡片
const checkCards = (e) =>{
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    // logic 如果两反过来 名字一样 就保留现状； 不然的话就返回去
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")){
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                // 保留正确的两张卡片不会再返回去 show正面出来，没办法再点击
                card.style.pointerEvents = "none";
            });
        }else{
            console.log("wrong");
            // 对每一个已经反过来的卡片 去除flipped这个class 
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                // 然后要将卡片转回去 去除togglecard这个class 回到最初的模样
                // 但是要set个时间延迟一下 不然无法点击下一个；
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart("👎 🐶You lose! Try again");
            };
        }
    }
    // check if won the game
    if(toggleCard.length === 16){
        restart("🎉 👏You won!"); 
    }
};

// create a function --- restart the game 选取全部已被反转的面 再返回去；
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    // 设置在游戏整理完成之前 不能再点击卡片
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        // 再randomize所有的卡片
        // 先把原本选定正确的卡片组保持不动 修改成为可动 然后更改图片来源 然后更改名称
        // set延迟 等所有卡片都转回去后 再开始下一轮游戏 防止下一轮的游戏卡片被看到
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 9;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 1000);
};


cardGenerator();

