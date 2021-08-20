(()=>{
    const carouselUL = document.querySelector(".carousel-list");
    const imageInput = document.querySelector("#image-upload-input");
    const sampleButton = document.querySelector("#sample-image-button");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    function changeTransform() {
        const items = document.querySelectorAll(".carousel-item");
        
        items.forEach((item, i) => {
            const degree = 360 / items.length
            item.style.opacity = 1;

            if (items.length <= 2) {
                item.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(${degree * i}deg)`;
            } else if (items.length <= 4) {
                if (i == 0) {
                    item.style.transform = "rotateY(-120deg) translateZ(250px) rotateY(120deg)";
                } else if (i == 1) {
                    item.style.transform = `rotateY(0deg) translateZ(250px) rotateY(0deg)`;
                } else if (i == 2) {
                    item.style.transform = `rotateY(120deg) translateZ(250px) rotateY(-120deg)`;
                } else {
                    item.style.transform = "rotateY(0deg) translateZ(-250px)";
                    item.style.opacity = 0;
                }
            } else  {
                if (i == 0) {
                    item.style.transform = "rotateY(-144deg) translateZ(250px) rotateY(144deg) translateX(-400px)";
                } else if (i == 1) {
                    item.style.transform = "rotateY(-72deg) translateZ(250px) rotateY(72deg)";
                } else if (i == 2) {
                    item.style.transform = "rotateY(0deg) translateZ(250px)";
                } else if (i == 3) {
                    item.style.transform = "rotateY(72deg) translateZ(250px) rotateY(-72deg)";
                } else if (i == 4) {
                    item.style.transform = "rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)";
                } else {
                    item.style.transform = "rotateY(0deg) translateZ(-250px)";
                    item.style.opacity = 0;
                }
            }
        })
    }

    function moveNext() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".now");
            const firstItem = carouselUL.firstElementChild;
            carouselUL.appendChild(firstItem);
            const now = items[items.length >= 5 ? 3 : Math.round(items.length / 2)];
            currentItem.classList.remove("now");
            now.classList.add("now");
        }
        changeTransform();
    }

    function movePrev() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".now");
            const lastItem = carouselUL.lastElementChild;
            const now = items[(items.length >= 5 || items.length == 2) ? 1 : 0]
            currentItem.classList.remove("now");
            now.classList.add("now");
            carouselUL.insertBefore(lastItem, items[0]);
        }
        changeTransform();
    }

    function createTag(url) {
        const list = document.createElement("li");
        const img = document.createElement("img");
        
        list.classList.add("carousel-item");
        img.src = url;
        list.appendChild(img);
        
        const items = document.querySelectorAll(".carousel-item");
        items.forEach(item => {
            item.classList.remove("now");
        });
        list.classList.add("now")
        return list;
    }

    function uploadImg(target) {
        const items = document.querySelectorAll(".carousel-item");
        
        if (target.files) {
            for (const file of target.files) {
                const reader = new FileReader();
            
                reader.onload = e => {
                    const imageURL = e.target.result;
                    carouselUL.insertBefore(createTag(imageURL),items[Math.floor(items.length/2)]);
                    changeTransform();
                }
                reader.readAsDataURL(file);
            }
        }
    };

    function settingImages(e) {
        e.preventDefault()
        const items = document.querySelectorAll(".carousel-item");
        for (let i = 1; i <= 5; i++) { 
            const imageURL = `/src/images/img${i}.svg`
            console.log(imageURL)
            carouselUL.insertBefore(createTag(imageURL),items[Math.floor(items.length/2)]);
            changeTransform();
        }
    }

    function throttle(callback, wait) {// callback: 실행 대상인 함수
        let waiting = true;  // true로 주어서 콜백함수가
                              // 처음 한번은 바로 실행되도록 함
        return function() {
          if (waiting) {
            callback();       
            waiting = false;   // false로 바꿔 실행되지 않도록 한다.
            setTimeout(() => {// wait만큼 시간이 지난 후,
              waiting = true;// true로 바뀌면서 다시 실행됨.
            }, wait);
          }
        };  
      };

    imageInput.addEventListener("change", e => uploadImg(e.target));
    
    const prev = throttle(movePrev, 300);
    const next = throttle(moveNext, 300);

    prevButton.addEventListener("click", prev);
    nextButton.addEventListener("click", next);
    sampleButton.addEventListener("click", settingImages)
    window.addEventListener("keydown", e => {
        if (e.key == "ArrowLeft") {
            next();
        }
        if (e.key == "ArrowRight") {
            prev();
        }
    });
    window.onload = () => {
        changeTransform()
    };
})();