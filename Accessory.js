import React, { useState, useEffect } from 'react';
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

const Accessory = () => {
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
                        return 10000 <= price && price <= 20000;
                    } else if (range === 'range2') {
                      return 40000 <= price && price <= 60000;
                    } else if (range === 'range3') {
                      return 60000 <= price && price <= 100000;
                    } else if (range === 'range4') {
                      return 100000 <= price && price <= 180000;
                    } else if (range === 'range5') {
                      return 160000 <= price && price <= 340000;
                    }
                     return false;
                  })
                );
            } else {
                // 다른 카테고리 필터링
                filteredProducts = Object.fromEntries(
                    Object.entries(filteredProducts).filter(([key, value]) => {
                    if (category === 'accessory') {
                        return values.some((filterValue) => {
                            return filterValue === value[category];
                          });
                      } else if (category === 'brand') {
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
        };
        // 다른 함수로 전달하거나 필요한 처리를 수행할 수 있음
        // ...

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

			<MyForm handleChange={handleChange} handleSearch={handleSearch} />

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

        <div className="body3_content">
    <div>
        <div className="tool_content2">
            액세서리
        </div>
        <div className="tool_checkbox">
            <label htmlFor="accessory_label1"><input type="checkbox" name="accessory" id="accessory_label1" value="템퍼" onChange={handleCategoryChange}/> 템퍼</label>
            <label htmlFor="accessory_label2"><input type="checkbox" name="accessory" id="accessory_label2" value="계량스푼" onChange={handleCategoryChange}/> 계량스푼</label>
            <label htmlFor="accessory_label3"><input type="checkbox" name="accessory" id="accessory_label3" value="넛박스" onChange={handleCategoryChange}/> 넛박스</label>
            <label htmlFor="accessory_label4"><input type="checkbox" name="accessory" id="accessory_label4" value="디스트리뷰터" onChange={handleCategoryChange}/> 디스트리뷰터</label>
        </div>
    </div>

    <div>
        <div className="tool_content2">
            가격
        </div>
        <div className="tool_checkbox">
            <label htmlFor="price_label1"><input type="checkbox" name='price' id="price_label1" value="range1" onChange={handleCategoryChange}/> 1만원 ~ 2만원</label>
            <label htmlFor="price_label2"><input type="checkbox" name='price' id="price_label2" value="range2" onChange={handleCategoryChange}/> 4만원 ~ 6만원</label>
            <label htmlFor="price_label3"><input type="checkbox" name='price' id="price_label3" value="range3" onChange={handleCategoryChange}/> 6만원 ~ 10만원</label>
            <label htmlFor="price_label4"><input type="checkbox" name='price' id="price_label4" value="range4" onChange={handleCategoryChange}/> 10만원 ~ 18만원</label>
            <label htmlFor="price_label5"><input type="checkbox" name='price' id="price_label5" value="range5" onChange={handleCategoryChange}/> 16만원 ~ 34만원</label>
        </div>
    </div>
    <div>
        <div className="tool_content2">
            브랜드
        </div>
        <div className="tool_checkbox">
            <label htmlFor="brand_label1"><input type="checkbox" name= "brand" id="brand_label1" value="풀만" onChange={handleCategoryChange}/> 풀만</label>
            <label htmlFor="brand_label2"><input type="checkbox" name= "brand" id="brand_label2" value="CBSC" onChange={handleCategoryChange}/> CBSC</label>
            <label htmlFor="brand_label3"><input type="checkbox" name= "brand" id="brand_label3" value="카페클럽" onChange={handleCategoryChange}/> 카페클럽</label>
            <label htmlFor="brand_label4"><input type="checkbox" name= "brand" id="brand_label4" value="칼딘" onChange={handleCategoryChange}/> 칼딘</label>
            <label htmlFor="brand_label5"><input type="checkbox" name= "brand" id="brand_label5" value="칼리타" onChange={handleCategoryChange}/> 칼리타</label>
            <label htmlFor="brand_label6"><input type="checkbox" name= "brand" id="brand_label6" value="이케아" onChange={handleCategoryChange}/> 이케아</label>
            <label htmlFor="brand_label7"><input type="checkbox" name= "brand" id="brand_label7" value="UNKNOWN" onChange={handleCategoryChange}/> UNKNOWN</label>
            <label htmlFor="brand_label8"><input type="checkbox" name= "brand" id="brand_label8" value="COVING" onChange={handleCategoryChange}/> COVING</label>
            <label htmlFor="brand_label9"><input type="checkbox" name= "brand" id="brand_label9" value="빈프로" /> 빈프로</label>
            <label htmlFor="brand_label10"><input type="checkbox" name= "brand" id="brand_label10" value="빈플랜트" /> 빈플랜트</label>
        </div>
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

export default Accessory;