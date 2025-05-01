import logo from './logo.svg';
import './App.css';
import {useState } from 'react';

function App() {
  const [products, setProducts] = useState([
    {id:1, name:"שרשרת זהב", price:500, img: "gold2.png"},
    {id:2, name:"צמיד זהב", price:250, img: "gold1.png"},
    {id:3, name:"עגילים זהב", price:100,},
    {id:4, name:"שרשרת כסף", price:300, }
  ]);

  const [nameValue, setNameValue] = useState(""); //משתנה עבור שם המוצר להוספה לצורך שליפת המידע מתוך האינפוט
  const [priceValue, setPriceValue] = useState ("");//משתנה עבור מחיר המוצר להוספה לצורך שליפת הנתון מתוך האינפוט
  const [cartProductArr, setCartProductArr] = useState([]);
  const [filterProduct, setFilterProduct] = useState(products)
  const [searchValue,setSearchValue]=useState("");
  const [user, setUser] = useState("manager") 
  const [time, setTime] = useState("morning")

  const  AddProduct = () => {  // פונקציית הוספת מוצר לחנות - צד מנהל
   const newProduct ={
    id: products[products.length-1].id+1,
    name: nameValue,
    price: priceValue
   }
   products.push(newProduct)
   setFilterProduct([...products])
   setNameValue("")
   setPriceValue("")
  }

  const AddCart = (p) =>{ //פונקציית הוספת מוצר לעגלה - צד לקוח 
    setCartProductArr((ToCart)=> [...ToCart,p])
  }

  const deleteP =(id)=>{//פונקציית מחיקה למוצר מהחנות
    const index=filterProduct.findIndex(p=> p.id==id)
    const newfilterProduct=[...filterProduct]
    newfilterProduct.splice(index,1)
    setFilterProduct(newfilterProduct)

  }

  const deleteC =(id)=>{//פונקציית מחיקה למוצר מהעגלה
    const index=cartProductArr.findIndex(p=> p.id==id)
    const newcartProductArr=[...cartProductArr]
    newcartProductArr.splice(index,1)
    setCartProductArr(newcartProductArr)

  }

  const getTotalPrice = () =>{ // פונקציית חישוב סה"כ לתשלום
    return cartProductArr.reduce((total,item) => total+item.price,0)
  }

  const AddAlert = () =>{ // הודעה עבור ההזמנה
    alert ("הזמנתך התקבלה")
  }

  const search = (txt) =>{ //פונקציית חיפוש
    setSearchValue(txt);
    const filterArr = products.filter(p=> p.name.includes(txt)||p.price.toString().includes(txt))
    setFilterProduct(filterArr)
  }

  return (
    <div className="App">
  <div>
      <button onClick={()=> setUser("manager")}>מנהל מתחבר</button>
      <button onClick={()=> setUser("user")}>משתמש מתחבר</button>
      </div>
    <p></p>
      <h3>שלום לך, {time=="morning"? "בוקר טוב!": time=="noon"? "צהריים טובים!" : "לילה טוב!"}</h3>
      <p></p>
      <div>
      <button onClick={()=> setTime("morning")}> בוקר</button>
      <button onClick={()=> setTime("noon")}> צהריים</button>
      <button onClick={()=> setTime("night")}> לילה</button>
      </div>
      <p></p>
      <p></p>
    <h1> חנות תכשיטים</h1> 
    <form>
      <input placeholder='חיפוש' onChange={(event)=>search(event.target.value)} value={searchValue} />
      </form>

   <div className="product-list">
    {
      filterProduct.map(p=> <div className="product" style=
      {{color: p.price>=200?"black":"white", backgroundColor: p.price>=200? "white":"orange"}}> 
        <h4>{p.name}</h4>
        <p>{p.price} ש"ח</p>
        {!p.img ? (
        <img src="./image/gold.png" alt="default" />
          ) : (
        <img src={`./image/${p.img}`} alt="product image" />
        )}

        <button type="button" onClick={()=>{AddCart(p)}}>הוסף לסל</button>
        {user=="manager"&&
        <button type="button" onClick={()=>{deleteP(p.id)}}>הסר </button>}
       
      </div> 
        )
    }
   
   </div>
   { user=="manager" &&
   <form>
    <h2>הוספת מוצר</h2>
    <input  placeholder="הכנס שם מוצר"onChange={(event)=> {setNameValue(event.target.value)}} value={nameValue}></input>
    <input  placeholder="הכנס מחיר"onChange={(event)=> {setPriceValue(parseInt(event.target.value))}} value={priceValue}></input>
    <button type= "button" onClick={()=>{AddProduct()}}>הוסף מוצר</button>
   </form>
   }

   {user=="user" &&
   <div className="cart">
      <h2>עגלה</h2>
        <ul>
          {
            cartProductArr.length==0?
            <p>אין לך מוצרים בעגלה!</p>
            :
        cartProductArr.map((p)=> 
          <li>{p.name} : {p.price} ש"ח  <button onClick={()=>(deleteC(p.id))}>הסר</button></li>
        )} 
        </ul>
        {

        cartProductArr.length==0?
        <p></p>
        :
        <h3>סה"כ לתשלום: {getTotalPrice()} ש"ח</h3>
        }
        {
         cartProductArr.length==0?
        <p></p>
        :
         <button type= "button" onClick={()=>{AddAlert()}}>בצע הזמנה</button>
     }
       
  
   </div> 
    }
   </div>
  );
  
}
export default App;




