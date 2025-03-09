let Lname = document.getElementById("name")
let price = document.getElementById("price")
let finish = document.getElementById("finish")

price.addEventListener("blur", f_addP)
Lname.addEventListener("blur", f_addP)
price.addEventListener("keypress", f_check_onlyNum)
finish.addEventListener("click", f_finish)

let pay = new Array()
let names = new Array()
let index = 0


function f_check_onlyNum() {
    let price = document.getElementById("price").value
    if ((event.keyCode < 48) || (event.keyCode > 57))
        event.preventDefault()
}

function f_addP() {
    let lbl=document.getElementById("lbl")
    let n = document.getElementById("name").value
    let p = document.getElementById("price").value
    if (n == "")
        Lname.focus()
    else if (p == "")
        price.focus()
    else {
        names[index] = n
        pay[index++] = p
        document.getElementById("name").value = ""
        document.getElementById("price").value = ""
        lbl.textContent="הפרטים נקלטו בהצלחה! באפשרותך להכניס שם נוסף או לסיים"
    }
}

function f_finish() {
    debugger
    document.getElementById("start").innerHTML=""
    let div=document.getElementById("div")
    sum = 0;
    //סכימה
    for (i = 0; i < pay.length; i++)
        sum += parseInt(pay[i]);

    //מציאת הסכום שעלה לכל אחד
    pricePerFamily = sum / pay.length;
    //הצבה לכל אחד במערך כמה הוא צריך לשלם או לקבל
    for (i = 0; i < pay.length; i++)
        pay[i] = pay[i] - pricePerFamily;
    //סידור המערך, כך שהמשלמים מימין ברצף תוך שמירת הסדר במערך השמות
    r = pay.length - 1, l = 0;
    while (r > l + 1) {
        while (pay[r] <= 0)
            r--;
        while (pay[l] >= 0)
            l++;
        if (r > l) {
            //החלפה במערך התשלום
            temp = pay[l];
            pay[l] = pay[r];
            pay[r] = temp;
            //החלפה זהה של השמות
            temp1 = names[l];
            names[l] = names[r];
            names[r] = temp1;
            r--;
            l++;
        }
    }
    //התשלום עצמו בשיטת אוהר
    j = pay.length - 1, i = 0;
    
    while (i < j) {
        s = "";
        while (pay[i] == 0)
            i++;
        while (pay[j] == 0)
            j--;
        x = -1 * pay[j];
        if (x > pay[i]) {
            s = names[j] + " ישלם " + pay[i] + " ל " + names[i] + "\n";
            pay[j] += pay[i];
            pay[i] = 0;
            i++;
        }
        else if (x < pay[i]) {
            s = names[j] + " ישלם " + (pay[j] * -1) + " ל " + names[i] + "\n";
            pay[i] += pay[j];
            pay[j] = 0;
            j--;
        }
        else {
            s = names[j] + " ישלם " + (pay[j] * -1) + " ל " + names[i] + "\n";
            pay[i] = 0;
            pay[j] = 0;
            j--;
            i++;
        }
        //יצירת אלמנט עם ההוראה הנוכחית
        let p=document.createElement("p")
        p.textContent=s
        p.className="res"
        let b=document.createElement("br")
        div.appendChild(p)
        div.appendChild(b)
    }
    let btn=document.createElement("button")
    btn.className="finish"
    btn.textContent="בצע חישוב נוסף"
    btn.addEventListener("click",f_load)
    div.appendChild(btn)
}

function f_load(){
    location.reload();
}

