
const btn=document.querySelector(".btn");
const table=document.querySelector(".body")
const books=[]

window.addEventListener("load", () => {
  const saved = localStorage.getItem("myLibrary");
  if (saved) {
    const parsed = JSON.parse(saved);
    parsed.forEach(b => {
      const book = new Book(b.name, b.author, b.pages, b.status);
      books.push(book);
    });
    table.innerHTML = "";  // limpio la tabla
    books.forEach(book => book.addToLibrary());
  }
});




class Book{
    constructor(name,author,pages,status){
        this.name=name;
        this.author=author;
        this.pages=pages;
        this.status=status;
        this.change=document.createElement("button");
        this.change.textContent="Change Read ";
        this.remove=document.createElement("button");
        this.remove.textContent="Remove";
    }
    addToLibrary(){
        const tr=document.createElement("tr");
        const name=document.createElement("td");
        const author=document.createElement("td");
        const pages=document.createElement("td");
        const status=document.createElement("td");
        const change=document.createElement("td");
        const remove=document.createElement("td");
        table.appendChild(tr);
        name.textContent=this.name;
        author.textContent=this.author;
        pages.textContent=this.pages;
        status.textContent=this.status;
        change.appendChild(this.change)
        remove.appendChild(this.remove)
        tr.appendChild(name)
        tr.appendChild(author)
        tr.appendChild(pages)
        tr.appendChild(status)
        tr.appendChild(change)
        tr.appendChild(remove)
        change.addEventListener("click",()=>{
            if(status.textContent=="Yes") status.textContent="No";
            else status.textContent="Yes"
            saveBooks();
        })
        remove.addEventListener("click",()=>{
            table.removeChild(tr);
            const index = books.indexOf(this);
            if (index > -1) books.splice(index, 1);
            saveBooks();
        })
    }
}
const addBook=(name,author,pages,status)=>{
    const newBook= new Book(name,author,pages,status);
    books.push(newBook);
    saveBooks()
    newBook.addToLibrary();
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.querySelectorAll("input[name='read']").forEach(input => input.checked = false);
}
const obtainOption=(options)=>{
    for(option of options){
        if (option.checked) return option.value
    }
    return null
}
btn.addEventListener("click",()=>{
    const name=document.getElementById("name").value;
    const author=document.getElementById("author").value;
    const pages=document.getElementById("pages").value;
    const options=document.querySelectorAll("input[name='read']");
    const status=obtainOption(options);
    if((name.trim()!=="" && !name.match(/[0-9]/g))&& (author.trim()!==""&& !author.match(/[0-9]/g) )&& Number(pages)>0 && status!==null) addBook(name,author,pages,status);
    else alert("Fill all the fields correctly")
})

function saveBooks() {
  localStorage.setItem("myLibrary", JSON.stringify(books));
}