import React, { useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/auth';
import './tool.css'
import './toolcategory.css'
import {Link} from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyCd6bZWVMldbGNF8AVJ_uqnDkUQfKNlr2o",
    authDomain: "cafein-dd39e.firebaseapp.com",
    databaseURL: "https://cafein-dd39e-default-rtdb.firebaseio.com",
    projectId: "cafein-dd39e",
    storageBucket: "cafein-dd39e.appspot.com",
    messagingSenderId: "298159218568",
    appId: "1:298159218568:web:ba8d244cfd92458749e43d"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else {
    firebase.app() // 이미 초기화되었다면, 초기화 된 것을 사용함
}

const MyForm = ({ handleChange, handleSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        handleChange(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(inputValue);
      };

    return (
        <div className="search">
            <input
            name="searching"
            type="search"
            className="input"
            placeholder="검색어를 입력하세요"
            onChange={handleInputChange}
            />
            <button type="button" className="search_button" id="search_button" style={{ cursor: 'pointer' }} onClick={handleSearchClick}>      
                검색
            </button>
        </div>
    );
};

const Coffee_machine = () => {
    const [isMoreCoffeeVisible, setMoreCoffeeVisible] = useState(false);

    const handleChange = (value) => {
        console.log(value);
    };

    const toggleMoreCoffee = () => {
        setMoreCoffeeVisible(!isMoreCoffeeVisible);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await firebase.firestore().collection('product').where('isbean', '==', false).get();
            const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());
            console.log(fetchedProducts);
            setProducts(fetchedProducts);
              };
          
              fetchProducts();
            }, []);
        

    const [selectedCategory, setSelectedCategory] = useState({});


    const handleCategoryChange = (event) => {
        const category = event.target.name; // 카테고리 이름
        const value = event.target.value; // 선택된 값
      
        setSelectedCategory((prevCategory) => {
          const updatedCategory = { ...prevCategory };
      
          if (updatedCategory[category]) {
            // 이미 선택된 카테고리에 해당 카테고리가 존재하면 값 업데이트
            if (updatedCategory[category].includes(value)) {
              // 이미 선택된 값이 있다면 제거
              const index = updatedCategory[category].indexOf(value);
              updatedCategory[category].splice(index, 1);
            } else {
              // 선택된 값이 없다면 추가
              updatedCategory[category].push(value);
            }
          } else {
            // 선택된 카테고리에 해당 카테고리가 존재하지 않으면 값 초기화 후 추가
            updatedCategory[category] = [value];
          }
      
          console.log(`선택된 카테고리 (${category}):`, updatedCategory);
          performActionWithSelectedCategory(updatedCategory);
      
          return updatedCategory;
        });
      }; 
      const performActionWithSelectedCategory = (selectedCategory) => {
        let filteredProducts = { ...products };
      
        Object.entries(selectedCategory).forEach(([category, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            if (category === 'price') {
                const range = values.find((value) => value.startsWith('range'));

                filteredProducts = Object.fromEntries(
                  Object.entries(filteredProducts).filter(([key, value]) => {
                    const price = value.price;
        
                    if (range === 'range1') {
                      return price >= 200000;
                    } else if (range === 'range2') {
                      return price > 200000 && price <= 500000;
                    } else if (range === 'range3') {
                      return price >= 500000 && price < 1000000;
                    } else if (range === 'range4') {
                      return price >= 1000000;
                    }
                    
                    return false;
                  })
                );
            } else {
              // 다른 카테고리 필터링
              filteredProducts = Object.fromEntries(
                  Object.entries(filteredProducts).filter(([key, value]) => {
                  if (category === 'machine') {
                      return values.some((filterValue) => {
                          return filterValue === value[category];
                        });
                    } else if (category === 'brand') {
                      return values.some((filterValue) => {
                          return filterValue === value[category];
                      });
                  } else if(category==='operation'){
                    return values.some((filterValue) => {
                      return filterValue === value[category];
                    });
                  } else if(category === 'usage'){
                    return values.some((filterValue) => {
                      return filterValue === value[category];
                  });
                  }
                })
              );
            }
          }
        });
       // 필터링된 결과를 활용하여 추가 작업 수행
       console.log("필터링된 상품:", filteredProducts);
       setFilteredProducts(filteredProducts);
     
       // 다른 함수로 전달하거나 필요한 처리를 수행할 수 있음
       // ...
     };

     const [searchResults, setSearchResults] = useState([]);
     const [filteredProducts, setFilteredProducts] = useState({});

     const handleSearch = (searchText) => {
       console.log("검색할거 : ", filteredProducts);
       const searchResults = Object.values(filteredProducts).filter((product) =>
         product.title.toLowerCase().includes(searchText.toLowerCase())
       );
       setSearchResults(searchResults); 
       console.log(searchResults);// Update searchResults state with the filtered results
     };

     useEffect(() => {
       setSearchResults(products);
     }, [products]);
    return (
    <>
        <div className = "shop_page">
            <div className ="nav2">
                <ul>
                <li><Link to='/Shop/Shop'>원두</Link></li>
                    <li><Link to ='/Shop/Tool' style={{ color: 'burlywood'}}>도구</Link></li>
                    <li><a href="new_product.html">신상</a></li>
                    <li><a href="sale.html">세일</a></li>
                    <li><Link to='/Shop/Event'>기획전</Link></li>
                </ul>
            </div>
            
        </div>

        <div className="body2_content">
            <div className="tool_content">
                <ul>
                    <li>카테고리</li>
                    <li><Link to='/Shop/Coffee_machine'>커피머신</Link></li>
                    <li><Link to='/Shop/Grinder'>그라인더</Link></li>
                    <li><Link to='/Shop/Accessory'>액세서리</Link></li>
                    <li><Link to='/Shop/Drip_coffee'>드립커피</Link></li>
                </ul>
            </div>
        </div>
        <MyForm handleChange={handleChange} handleSearch={handleSearch} />

        <div className="body3_content">
            <div className="coffe_machine1">
                <div className="tool_content2">
                    커피머신
                </div>
                <div className="tool_checkbox">
                    <label htmlFor="coffee_machine_label1">
                    <input type="checkbox" id="coffee_machine_label1" name='machine' value="에스프레소 머신"  onChange={handleCategoryChange}/> 에스프레소 머신
                    </label>
                    <label htmlFor="coffee_machine_label2">
                        <input type="checkbox" id="coffee_machine_label2" name='machine' value="캡슐 커피머신" onChange={handleCategoryChange}/> 캡슐 커피머신
                    </label>
                </div>
            </div>

            <div className="tool_content2">
                용도
            </div>
                <div className="tool_checkbox">
                    <label htmlFor="use_label1"><input type="checkbox" name='usage'id="use_label1" value="가정용" onChange={handleCategoryChange}/> 가정용</label>
                    <label htmlFor="use_label2"><input type="checkbox" name='usage' id="use_label2" value="업소용" onChange={handleCategoryChange}/> 업소용</label>
                </div>

            <div className="tool_content2">
                가격
            </div>
                <div className="tool_checkbox">
                    <label htmlFor="price_label1"><input type="checkbox" name='price' id="price_label1" value="range1" onChange={handleCategoryChange}/> 20만원이하</label>
                    <label htmlFor="price_label2"><input type="checkbox" name='price' id="price_label2" value="range2"  onChange={handleCategoryChange}/> 20만원 ~ 50만원</label>
                    <label htmlFor="price_label3"><input type="checkbox" name='price' id="price_label3" value="range3" onChange={handleCategoryChange}/> 50만원 ~ 100만원</label>
                    <label htmlFor="price_label4"><input type="checkbox" name='price' id="price_label4" value="range4"  onChange={handleCategoryChange}/> 100만원이상</label>
                </div>

            <div className="tool_content2">
                조작방식
            </div>
                <div className="tool_checkbox">
                    <label htmlFor="operation_method_label1"><input type="checkbox" name='operation' id="operation_method_label1" value="전자동"  onChange={handleCategoryChange}/> 전자동</label>
                    <label htmlFor="operation_method_label2"><input type="checkbox" name='operation' id="operation_method_label2" value="반자동" onChange={handleCategoryChange}/> 반자동</label>
                    <label htmlFor="operation_method_label3"><input type="checkbox" name='operation' id="operation_method_label3" value="수동식"  onChange={handleCategoryChange}/> 수동식</label>
                    <label htmlFor="operation_method_label4"><input type="checkbox" name='operation' id="operation_method_label4" value="전동식" onChange={handleCategoryChange}/> 전동식</label>
                </div>

            <div className="tool_content2">
                브랜드
            </div>
                <div className="tool_checkbox">
                    <label htmlFor="brand_label1"><input type="checkbox" name='brand' id="brand_label1" value="네스프레소" onChange={handleCategoryChange}/> 네스프레소</label>
                    <label htmlFor="brand_label2"><input type="checkbox" name='brand' id="brand_label2" value="필립스"  onChange={handleCategoryChange}/> 필립스</label>
                    <label htmlFor="brand_label3"><input type="checkbox" name='brand' id="brand_label3" value="드롱기"  onChange={handleCategoryChange}/> 드롱기</label>
                    <label htmlFor="brand_label4"><input type="checkbox" name='brand' id="brand_label4" value="플랜잇"  onChange={handleCategoryChange}/> 플랜잇</label>
                    <label htmlFor="brand_label5"><input type="checkbox" name='brand' id="brand_label5" value="브레빌"  onChange={handleCategoryChange}/> 브레빌</label>
                    <label htmlFor="brand_label6"><input type="checkbox" name='brand' id="brand_label6" value="테팔"  onChange={handleCategoryChange}/> 테팔</label>
                    <label htmlFor="brand_label7"><input type="checkbox" name='brand' id="brand_label7" value="밀리타"  onChange={handleCategoryChange}/> 밀리타</label>
                    <label htmlFor="brand_label8"><input type="checkbox" name='brand' id="brand_label8" value="유라" onChange={handleCategoryChange}/> 유라</label>
                    <label htmlFor="brand_label9"><input type="checkbox" name='brand' id="brand_label9" value="가찌아"  onChange={handleCategoryChange}/> 가찌아</label>
                    <label htmlFor="brand_label10"><input type="checkbox" name='brand' id="brand_label10" value="EL ROCIO" onChange={handleCategoryChange}/> EL ROCIO</label>
                </div>
                <div className="coffee_product_list">
            <h1>상품 리스트</h1>
            <div className="product-list" id="productList"></div>
            </div>
            <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id} className="search-result-item">
              <img src={result.img} alt={result.title} />
              <h3>{result.title}</h3>
              <p>가격 : {result.price}</p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
    </div>
            </div>
            </>
    );
  };
  

export default Coffee_machine;