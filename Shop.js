import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import './coffee.css'

const firebaseConfig = {
    apiKey: "AIzaSyCd6bZWVMldbGNF8AVJ_uqnDkUQfKNlr2o",
    authDomain: "cafein-dd39e.firebaseapp.com",
    databaseURL: "https://cafein-dd39e-default-rtdb.firebaseio.com",
    projectId: "cafein-dd39e",
    storageBucket: "cafein-dd39e.appspot.com",
    messagingSenderId: "298159218568",
    appId: "1:298159218568:web:ba8d244cfd92458749e43d"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
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
  
  

const Shop = () => {
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
    const querySnapshot = await firebase.firestore().collection('product').where('isbean', '==', true).get();
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
                      return price <= 8000;
                    } else if (range === 'range2') {
                      return price > 8000 && price <= 12000;
                    } else if (range === 'range3') {
                      return price > 12000 && price <= 20000;
                    } else if (range === 'range4') {
                      return price > 20000 && price <= 30000;
                    } else if (range === 'range5') {
                      return price > 30000;
                    }
        
                    return false;
                  })
                );
            } else {
              // 다른 카테고리 필터링
              filteredProducts = Object.fromEntries(
                Object.entries(filteredProducts).filter(([key, value]) => {
                  if (category === 'coffee') {
                    // coffee 카테고리 필터링
                    if (value[category] === true) {
                      return values.includes('blend');
                    } else if (value[category] === false) {
                      return values.includes('single');
                    }
                    return false;
                  } else if (category === 'cafein') {
                    // cafein 카테고리 필터링
                    if (value[category] === true) {
                      return values.includes('true');
                    } else if (value[category] === false) {
                      return values.includes('false');
                    }
                    return false;
                  } else if (category === 'equal') {
                    // equal 카테고리 필터링
                    if (value[category] === true) {
                      return values.includes('true');
                    } else if (value[category] === false) {
                      return values.includes('false');
                    }
                    return false;
                  } else {
                    // 기타 카테고리 필터링
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
                    <li><Link to='/Shop/Shop' style={{ color: 'burlywood' }}>원두</Link></li>
                    <li><Link to='/Shop/Tool'>도구</Link></li>
                    <li><Link to='/Shop/NewProduct'>신상</Link></li>
                    <li><Link to='/Shop/OnSale'>세일</Link></li>
                    <li><Link to='/Shop/Event0'>기획전</Link></li>
                </ul>
            </div>  
        </div>

        <MyForm handleChange={handleChange} handleSearch={handleSearch} />
        
        <div className="body_content">
            <div className="coffee_mix">
                <div className="coffee_mix_choice">
                    원두 혼합 유무
                </div>
                <div className="coffee_mix_checkbox">
                    <label htmlFor="coffee_mix_label1">
                        <input type="checkbox" id="coffee_mix_label1" name="coffee" value="blend" onChange={handleCategoryChange} />
                        블렌딩 (2가지 이상의 원두를 혼합)
                    </label>

                    <label htmlFor="coffee_mix_label2">
                        <input type="checkbox" id="coffee_mix_label2" name="coffee" value="single" onChange={handleCategoryChange} />
                        싱글 오리진 (1가지 원두만 이용)
                    </label>
                </div>
            </div>

            <div className="coffee_taste">
                <div className="coffee_mix_choice">
                    커피 맛(다중 선택 가능)
                </div>
                <div className="coffee_mix_checkbox">
                    <label htmlFor="coffee_taste_label1">
                        <input type="checkbox" id="coffee_taste_label1" name="taste" value="계피" onChange={handleCategoryChange}/>
                        계피
                    </label>

                    <label htmlFor="coffee_taste_label2">
                        <input type="checkbox" id="coffee_taste_label2" name="taste" value="바닐라" onChange={handleCategoryChange}/>
                        바닐라
                    </label>

                    <label htmlFor="coffee_taste_label3">
                        <input type="checkbox" id="coffee_taste_label3" name="taste" value="브렛퍼스트 블렌드" onChange={handleCategoryChange}/>
                        브렛퍼스트 블렌드
                    </label>

                    <label htmlFor="coffee_taste_label4">
                        <input type="checkbox" id="coffee_taste_label4" name="taste" value="블루베리" onChange={handleCategoryChange}/>
                        블루베리
                    </label>

                    <label htmlFor="coffee_taste_label5">
                        <input type="checkbox" id="coffee_taste_label5" name="taste" value="아마레토" onChange={handleCategoryChange}/>
                        아마레토
                    </label>
                    <br />
                    <label htmlFor="coffee_taste_label6">
                        <input type="checkbox" id="coffee_taste_label6" name="taste" value="아이리시 크림" onChange={handleCategoryChange}/>
                        아이리시 크림
                    </label>
                    <label htmlFor="coffee_taste_label7">
                        <input type="checkbox" id="coffee_taste_label7" name="taste" value="초콜릿 라즈베리" onChange={handleCategoryChange} />
                        초콜렛 라즈베리
                    </label>
                    <label htmlFor="coffee_taste_label8">
                        <input type="checkbox" id="coffee_taste_label8" name="taste" value="캐러멜" onChange={handleCategoryChange}/>
                        캐러멜
                    </label>
                    <label htmlFor="coffee_taste_label9">
                        <input type="checkbox" id="coffee_taste_label9" name="taste" value="펌킨 스파이스" onChange={handleCategoryChange}/>
                        펌킨 스파이스
                    </label>
                    <label htmlFor="coffee_taste_label10">
                        <input type="checkbox" id="coffee_taste_label10" name="taste" value="헤이즐넛" onChange={handleCategoryChange}/>
                        헤이즐넛
                    </label>
                    <label htmlFor="coffee_taste_label11">
                        <input type="checkbox" id="coffee_taste_label11" name="taste" value="Others" onChange={handleCategoryChange}/>
                        기타
                    </label>
                </div>
            </div>

            <div className="coffee_grind">
                <div className="coffee_mix_choice">
                    분쇄 타입
                </div>
                <div className="coffee_mix_checkbox">
                    <label htmlFor="coffee_grind_label1">
                        <input type="checkbox" id="coffee_grind_label1" name="roasting" value="생두" onChange={handleCategoryChange}/>
                        생두
                    </label>
                    <label htmlFor="coffee_grind_label2">
                        <input type="checkbox" id="coffee_grind_label2" name="roasting" value="원두" onChange={handleCategoryChange}/>
                        원두
                    </label>
                    <label htmlFor="coffee_grind_label3">
                        <input type="checkbox" id="coffee_grind_label3" name="roasting" value="분쇄커피" onChange={handleCategoryChange}/>
                        분쇄커피
                    </label>
                </div>
            </div>

            <div className="coffee_price">
                <div className="coffee_mix_choice">
                    가격
                </div>
                <div className="coffee_mix_checkbox">
                    <label htmlFor="coffee_price_label1">
                        <input type="checkbox" id="coffee_price_label1" name="price" value="range1" onChange={handleCategoryChange}/>
                        ~8천원
                    </label>

                    <label htmlFor="coffee_price_label2">
                        <input type="checkbox" id="coffee_price_label2" name="price" value="range2" onChange={handleCategoryChange}/>
                        8천원 ~ 1만 2천원
                    </label>

                    <label htmlFor="coffee_price_label3">
                        <input type="checkbox" id="coffee_price_label3" name="price" value="range3" onChange={handleCategoryChange}/>
                        1만 2천원 ~ 2만원
                    </label>

                    <label htmlFor="coffee_price_label4">
                        <input type="checkbox" id="coffee_price_label4" name="price" value="range4" onChange={handleCategoryChange}/>
                        2만원 ~ 3만원
                    </label>
                    
                    <label htmlFor="coffee_price_label5">
                        <input type="checkbox" id="coffee_price_label5" name="price" value="range5" onChange={handleCategoryChange}/>
                        3만원 ~
                    </label>
                </div>
            </div>

            <div className="coffee_caffein">
                <div className="coffee_mix_choice">카페인 유무</div>
                <div className="coffee_mix_checkbox">
                    <label htmlFor="coffee_caffein_label1">
                        <input type="checkbox" id="coffee_caffein_label1" name="cafein" value="true" onChange={handleCategoryChange}/>
                        카페인
                    </label>
                    <label htmlFor="coffee_caffein_label2">
                        <input type="checkbox" id="coffee_caffein_label2" name="cafein" value="false" onChange={handleCategoryChange}/>
                        디카페인
                    </label>
                </div>
            </div>

            <div className="more_button">
                <button onClick={toggleMoreCoffee}  className="more_button" id="more_button" style={{ cursor: 'pointer' }}>
                    더보기
                </button>
            </div>

            <div className="more_coffee" style={{ display: isMoreCoffeeVisible ? 'block' : 'none' }} id="more_coffee">
                <div className="coffee_roasting">
                    <div className="coffee_mix_choice">로스팅 단계</div>
                    <div className="coffee_mix_checkbox">
                        <label htmlFor="coffee_roasting_label1">
                            <input type="checkbox" id="coffee_roasting_label1" name="roastingLevel" value="Light" onChange={handleCategoryChange} />
                            라이트
                        </label>
                        <label htmlFor="coffee_roasting_label2">
                            <input type="checkbox" id="coffee_roasting_label2" name="roastingLevel" value="Medium" onChange={handleCategoryChange}/>
                            미디엄
                        </label>
                        <label htmlFor="coffee_roasting_label3">
                            <input type="checkbox" id="coffee_roasting_label3" name="roastingLevel" value="Dark" onChange={handleCategoryChange}/>
                            다크
                        </label>
                    </div>
                </div>

                <div className="coffee_fair_trade">
                    <div className="coffee_mix_choice">공정무역 여부</div>
                    <div className="coffee_mix_checkbox">
                        
                        <label htmlFor="coffee_fair_label1">
                            <input type="checkbox" id="coffee_fair_label1" name="equal" value="true" onChange={handleCategoryChange}/>
                            공정무역 O
                        </label>

                        <label htmlFor="coffee_fair_label2">
                            <input type="checkbox" id="coffee_fair_label2" name="equal" value="false" onChange={handleCategoryChange}/>
                            공정무역 X
                        </label>
                    </div>
                </div>

                <div class="coffee_level">
                    <div class="coffee_mix_choice">등급</div>
                    <div className="coffee_mix_checkbox">
                        <label htmlFor="coffee_level_label1">
                            <input type="checkbox" id="coffee_level_label1" name="level" value="aa" onChange={handleCategoryChange}/> AA
                        </label>
                        <label htmlFor="coffee_level_label2">
                            <input type="checkbox" id="coffee_level_label2" name="level" value="g1" onChange={handleCategoryChange}/> G1
                        </label>
                        <label htmlFor="coffee_level_label3">
                            <input type="checkbox" id="coffee_level_label3" name="level" value="g2" onChange={handleCategoryChange}/> G2
                        </label>
                        <label htmlFor="coffee_level_label4">
                            <input type="checkbox" id="coffee_level_label4" name="level" value="g3" onChange={handleCategoryChange} /> G3
                        </label>
                        <label htmlFor="coffee_level_label5">
                            <input type="checkbox" id="coffee_level_label5" name="level" value="g4" onChange={handleCategoryChange}/> G4
                        </label>
                        <br/> 
                        <label htmlFor="coffee_level_label6">
                            <input type="checkbox" id="coffee_level_label6" name="level" value="ny2" onChange={handleCategoryChange}/> NY2
                        </label>
                        <label htmlFor="coffee_level_label7">
                            <input type="checkbox" id="coffee_level_label7" name="level" value="pb" onChange={handleCategoryChange}/> PB
                        </label>
                        <label htmlFor="coffee_level_label8">
                            <input type="checkbox" id="coffee_level_label8" name="level" value="shb" onChange={handleCategoryChange}/> SHB
                        </label>
                        <label htmlFor="coffee_level_label9">
                            <input type="checkbox" id="coffee_level_label9" name="level" value="shg" onChange={handleCategoryChange}/> SHG
                        </label>
                        <label htmlFor="coffee_level_label10">
                            <input type="checkbox" id="coffee_level_label10" name="level" value="수프리모" onChange={handleCategoryChange}/> 수프리모
                        </label>
                        <label htmlFor="coffee_level_label11">
                            <input type="checkbox" id="coffee_level_label11" name="level" value="others" onChange={handleCategoryChange}/> 기타
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div className="search-results">
  {searchResults.length > 0 ? (
    searchResults.map((result) => (
      <div key={result.id} className="search-result-item" style={{ position:"absoulute", marginTop: "90%", marginLeft:'30%'}}>
        <a href={`/Shop/ProductDetail/${result.id}`}>
          <img src={result.img} alt={result.title} style={{width:"30%"}}/>
          <h3>{result.title}</h3>
        </a>
        <p>가격: {result.price}</p>
      </div>
    ))
  ) : (
    <p>검색 결과가 없습니다.</p>
  )}
</div>

    </>
    );
};


export default Shop;