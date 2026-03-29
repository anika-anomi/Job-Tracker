let interviewList=[];
let rejectList=[];

let total=document.getElementById("total");
let interview=document.getElementById("interviewTotal");
let rejected=document.getElementById("rejectedTotal");
let count=document.getElementById("count");

const filteredSection=document.getElementById("filtered-section");
const allCards=document.getElementById("allCard");
const mainContainer=document.querySelector("main");

const allFilterBtn=document.getElementById("all-filter-btn");
const interviewFilterBtn=document.getElementById("interview-filter-btn");
const rejectedFilterBtn=document.getElementById("rejected-filter-btn");

function renderFilteredEmptyState(){
    filteredSection.innerHTML=`
        <div class="no-job-message">
            <img src="./images/jobs.png">
            <p class="filter-heading">No jobs available</p>
            <p>Check back soon for new job opportunities</p>
        </div>
    `;
}

function calculateCount(){
    total.innerText=allCards.querySelectorAll(".card").length;
    interview.innerText=interviewList.length;
    rejected.innerText=rejectList.length;
}

calculateCount()
count.innerText=allCards.querySelectorAll(".card").length;

function toggleStyle(id){
    allFilterBtn.classList.add("active");
    interviewFilterBtn.classList.add("active");
    rejectedFilterBtn.classList.add("active");

    allFilterBtn.classList.remove("active");
    interviewFilterBtn.classList.remove("active");
    rejectedFilterBtn.classList.remove("active");

    const selected=document.getElementById(id);
   
    selected.classList.remove("active");
    selected.classList.add("active");   
}

mainContainer.addEventListener("click",function(event){
    if(event.target.classList.contains("interview-btn")){
        const card=event.target.closest(".card");
        const jobTitle=card.querySelector(".jobName").innerText;
        const companyName=card.querySelector(".compayName").innerText;
        const jobDescription=card.querySelector(".jobDescription").innerText;
        const status=card.querySelector(".status");
        const notes=card.querySelector(".notes").innerText;

        const jobObj={
            jobTitle,
            companyName,
            jobDescription,
            status: "Interview",
            notes
        }

        const interviewExists=interviewList.find(job=>job.jobTitle===jobTitle && job.companyName===companyName);
        if(!interviewExists){
            interviewList.push(jobObj);
        }

        rejectList=rejectList.filter(job=>!(job.jobTitle===jobTitle && job.companyName===companyName));
        status.innerText="Interview";
        status.style.color="#16a34a";
        status.style.backgroundColor="#d2e8da";
        calculateCount();

        if(interviewFilterBtn.classList.contains("active")){
            count.innerText=interviewList.length;
            if(interviewList.length===0){
                renderFilteredEmptyState();
            }else{
                renderCards(interviewList);
            }
        }

        if(rejectedFilterBtn.classList.contains("active")){
            count.innerText=rejectList.length;
            if(rejectList.length===0){
                renderFilteredEmptyState();
            }else{
                renderCards(rejectList);
            }
        }
    }

    if(event.target.classList.contains("rejected-btn")){
        const card=event.target.closest(".card");
        const jobTitle=card.querySelector(".jobName").innerText;
        const companyName=card.querySelector(".compayName").innerText;
        const jobDescription=card.querySelector(".jobDescription").innerText;
        const status=card.querySelector(".status");
        const notes=card.querySelector(".notes").innerText;

        const jobObj={
            jobTitle,
            companyName,
            jobDescription,
            status: "Rejected",
            notes
        }

        const rejectedExists=rejectList.find(job=>job.jobTitle===jobTitle && job.companyName===companyName);
        if(!rejectedExists){
            rejectList.push(jobObj);
        }

        interviewList=interviewList.filter(job=>!(job.jobTitle===jobTitle && job.companyName===companyName));
        status.innerText="Rejected";
        status.style.color="#dc2626";
        status.style.backgroundColor="#fbd3d3";
        calculateCount();

        if(interviewFilterBtn.classList.contains("active")){
            count.innerText=interviewList.length;
            if(interviewList.length===0){
                renderFilteredEmptyState();
            }else{
                renderCards(interviewList);
            }
        }

        if(rejectedFilterBtn.classList.contains("active")){
            count.innerText=rejectList.length;
            if(rejectList.length===0){
                renderFilteredEmptyState();
            }else{
                renderCards(rejectList);
            }
        }
    }

    if(event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")){
        const card=event.target.closest(".card");
        const jobTitle=card.querySelector(".jobName").innerText;
        const companyName=card.querySelector(".compayName").innerText;

        interviewList=interviewList.filter(job=>!(job.jobTitle===jobTitle && job.companyName===companyName));
        rejectList=rejectList.filter(job=>!(job.jobTitle===jobTitle && job.companyName===companyName));

        card.remove();
        calculateCount();
        count.innerText=allCards.querySelectorAll(".card").length;

        if(interviewFilterBtn.classList.contains("active") && interviewList.length===0){
            filteredSection.classList.remove("hidden");
            filteredSection.style.display="grid";
            renderFilteredEmptyState();
        }

        if(rejectedFilterBtn.classList.contains("active") && rejectList.length===0){
            filteredSection.classList.remove("hidden");
            filteredSection.style.display="grid";
            renderFilteredEmptyState();
        }
        
        if(allCards.querySelectorAll(".card").length===0){
            allCards.style.display="none";
            filteredSection.classList.remove("hidden");
            filteredSection.style.display="grid";
            renderFilteredEmptyState();
        }
    }
})

function renderCards(list){
    filteredSection.innerHTML="";
    for (let job of list) {
        let div=document.createElement("div");
        div.className="card";
        div.innerHTML=`
                <div>
                    <div>
                        <p class="compayName">${job.companyName}</p>
                        <p class="jobName">${job.jobTitle}</p>
                        <p class="jobDescription">${job.jobDescription}</p>
                    </div>
                    
                    <p class="status">${job.status}</p>
                    <p class="notes">${job.notes}</p>
                   
                    <div class="action-btn">
                        <button class="interview-btn">Interview</button>
                        <button class="rejected-btn">Rejected</button>
                    </div>
                    
                </div>
                <div>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
        `;
        filteredSection.appendChild(div);
    }
}

allFilterBtn.addEventListener("click",function(){
    const totalCards=allCards.querySelectorAll(".card").length;
    count.innerText=totalCards;

    if(totalCards===0){
        allCards.style.display="none";
        filteredSection.classList.remove("hidden");
        filteredSection.style.display="grid";
        renderFilteredEmptyState();
    }else{
        allCards.style.display="grid";
        filteredSection.style.display="none";
    }
})

interviewFilterBtn.addEventListener("click",function(){
    allCards.style.display="none";
    filteredSection.style.display="grid";
    count.innerText=interviewList.length;
    if(interviewList.length===0){
        filteredSection.classList.remove("hidden");
        renderFilteredEmptyState();
    }else{
        filteredSection.classList.remove("hidden");
        renderCards(interviewList);
    }
})

rejectedFilterBtn.addEventListener("click",function(){
    allCards.style.display="none";
    filteredSection.style.display="grid";
    count.innerText=rejectList.length;
    if(rejectList.length===0){
        filteredSection.classList.remove("hidden");
        renderFilteredEmptyState();
    }else{
        filteredSection.classList.remove("hidden");
        renderCards(rejectList);
    }
})