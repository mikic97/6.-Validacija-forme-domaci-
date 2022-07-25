let inputs = document.querySelectorAll('input')
let errors = {
    "ime_prezime": [],
    "korisnicko_ime": [],
    "email": [],
    "lozinka" : [],
    "ponovi_lozinku" : [], 
    "credit_card" : [],
    "adress" : []
}
inputs.forEach(element => {
    element.addEventListener("change", e =>{
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');
        
        if (inputValue.length > 4){
              errors[inputName] = [];

            switch(inputName){
                case "ime_prezime":
                    let validation = inputValue.trim();
                    validation =validation.split(" ");
                    if (validation.length < 2){
                        errors[inputName].push('moras napisati i ime i ime_prezime')

                    }
                    break;

                    case 'email':
                        if(!validateEmail(inputValue)) {
                            errors[inputName].push('neispravna e mail adresa');
                        }
                        break;

                        case 'ponovi_lozinku':
                            let lozinka = document.querySelector('input[name="lozinka"]').value;
                            if(inputValue !== lozinka) {
                                errors[inputName].push('lozinke se ne poklapaju')
                            }
                            break;
                         
                        case 'credit_card':
                            
                            if (!validateCard(inputValue)) {
                                errors[inputName].push('Visa kartica uvek pocinje sa brojem 4 i sadrzi najvise do 16 brojeva!');
                            }  
                            break; 

                        case 'adress': 
                           
                            if(!validateAdress(inputValue)) {
                                errors[inputName].push('Adresa mora da sadrzi ime i broj ulice')
                            }
                        }           


        } else{
            errors[inputName] = ['polje ne moze imati manje od 5 karaktera']
        }
        populateErrors()
    })

})

const populateErrors = () => {

    for(let elem of document.querySelectorAll('ul')){
        elem.remove();
    }

    for(let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`)
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement)

        errors[key].forEach(error =>{ 
            let li = document.createElement('li');
            li.innerText = error;
            
            errorsElement.appendChild(li)
        })
    }
}
const validateEmail = email => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
} 
return false;
}

const validateCard = card => {
    if(/^4[0-9]{12}(?:[0-9]{3})?$/.test(card)){
        return true;
    }
    return false; 
}

const validateAdress = adress => {
    if(/^([A-ZÄÖÜ][a-zäöüß]+(([.] )|( )|([-])))+[1-9][0-9]{0,3}[a-z]?$/.test(adress)){
    return true;
}
return false;
}