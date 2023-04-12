/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function refresh(event){
    const button = event.currentTarget;
    const section = button.parentNode;
    for(const box of boxes){
       box.classList.remove('nonselezione');
       box.classList.remove('selezione');
       box.querySelector('.checkbox').src='images/unchecked.png';
       box.addEventListener('click',selection);
    }

    selectedBox.splice(0, selectedBox.length);

    section.innerHTML='';
    section.classList.remove('risposta');
    section.classList.add('hidden');
}

function getResults(){
    let choice = '';
    const results={};
    for(const sel of selectedBox){
        results[sel.dataset.questionId]=sel.dataset.choiceId;
    }
    
    if(results.one !== results.two && results.two !== results.three){
        choice = results.one;
    }
    else{
        if(results.one === results.two){
            choice = results.one;
        }
        else{
            if(results.one === results.three){
                choice = results.one;
            }
            else{
                choice = results.two;
            }
        }
    }
    const section = document.querySelector('.hidden');
    const new_h1 = document.createElement('h1');
    new_h1.textContent = RESULTS_MAP[choice].title;
    const new_p = document.createElement('p');
    new_p.textContent = RESULTS_MAP[choice].contents;
    const new_button = document.createElement('button');
    new_button.textContent="Ricomincia il quiz";
    section.classList.remove('hidden');
    section.classList.add('risposta');
    section.appendChild(new_h1);
    section.appendChild(new_p);
    section.appendChild(new_button);
    console.log(results);

    new_button.addEventListener('click', refresh);
}


function check(box, checkbox){
    checkbox.src='images/checked.png';
    box.classList.add('selezione');

    selectedBox.push(box);
    overlay(box);
}

function overlay(box){
    for(let elem of boxes){
        if(elem !== box && elem.dataset.questionId === box.dataset.questionId){
            elem.classList.add("nonselezione"); 
        }
    }
}

function selection(event){
    const box = event.currentTarget;
    const checkbox = box.querySelector('.checkbox');
    if(box.className==='nonselezione'){
        for(const sel of selectedBox){
            if(sel.dataset.questionId===box.dataset.questionId){
                box.classList.remove('nonselezione');
                sel.querySelector('.checkbox').src = 'images/unchecked.png';
                sel.classList.remove('selezione');
                sel.addEventListener('click', selection);
                selectedBox.splice(selectedBox.indexOf(sel),1);
            }
        }
        check(box, checkbox);
        console.log('hai cambiato scelta!')
    }else{
        
        if(box.className==='selezione'){
            for(const sel of selectedBox){
                if(sel.dataset.questionId===box.dataset.questionId){
                    selectedBox.splice(selectedBox.indexOf(sel),1);
                    box.classList.remove('selezione');
                    checkbox.src = 'images/unchecked.png';
                }
            }

            for(const elem of boxes){
                if(elem.dataset.questionId===box.dataset.questionId)
                    elem.classList.remove('nonselezione');
            }
            console.log('hai deselezionato!')
        }else{
            if(box.className!=='selezione' && box.className!=='nonselezione'){
                check(box, checkbox);
                console.log('hai selezionato!')
            }
        }
    }

    if(selectedBox.length===3){
        for(const box of boxes){
            box.removeEventListener('click', selection);
        }
        getResults();
    }
}


const selectedBox=[];
const boxes = document.querySelectorAll('.choice-grid div');
for(let box of boxes){
    box.addEventListener('click', selection);
}