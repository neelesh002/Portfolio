document.addEventListener('DOMContentLoaded',function(){
    const hamburger = document.querySelector(".humburger");
    const navlinks = document.querySelector(".nav-links");
    
   hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navlinks.classList.toggle("active")
   })

//    skills-section.............

const skillsSection = document.querySelector('.skills-section');
const skillsBars = document.querySelectorAll('.skill-progress');
const percentNumber = document.querySelectorAll('.percent-number');


let skillAnimated = false;

function animateSkills(){
    if(skillAnimated) return;

    skillsBars.forEach((bar,index)=>{
        const percent = parseInt(bar.getAttribute('data-percent'));
        bar.style.width = percent + '%';

        let currentPercent = 0;

     const updateCounter=setInterval(()=>{
        if(currentPercent < percent){
            currentPercent++;
            percentNumber[index].textContent = currentPercent;
        }
        else{
            clearInterval(updateCounter);
        }
     },20); 
        

    });
    skillAnimated= true;
}   

// stats=section................
 
    const statsSection=document.querySelector('.stats-section');
    const counter =document.querySelectorAll('.stats-number');
    
    let statAnimated = false;

    function animatestate(){
        if(statAnimated) return 

        counter.forEach(counter =>{
            const target= +counter.getAttribute('data-target');
            const duration = 2000;

            const increment=target /(duration/16); 

            let currentCount = 0;
            const updateCount = ()=>{
                if(currentCount < target){
                    currentCount+= increment
                    counter.textContent = Math.floor(currentCount);
                    requestAnimationFrame(updateCount);

                }else{
                    counter.textContent = target;
                }
            };
            updateCount();

        });
        statAnimated=true;
    };
    
 


// ..............

const observerOptions ={
    root:null,
    rootMargin: '0px',
    threshold: 0.5
}

const skillObserver= new IntersectionObserver((enteries)=>{
    enteries.forEach(entry=>{
        if(entry.isIntersecting){
            animateSkills();
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions)

const statsObserver= new IntersectionObserver((enteries)=>{
    enteries.forEach(entry=>{
        if(entry.isIntersecting){
            animatestate();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions)


statsObserver.observe(statsSection);
skillObserver.observe(skillsSection);
   AOS.init();
 
});