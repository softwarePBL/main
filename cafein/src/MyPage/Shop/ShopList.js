import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { dbService, authService } from '../../fbase';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Pic from '../../profile.png';


const ShopList = () => {
  const user = authService.currentUser;
  const [productData, setProductData] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);
  
  const [trackingNumber, setTrackingNumber] = useState('');

  const getOrderData = async () => {
    try {
      const orderCollectionRef = collection(dbService, 'Order');
      const querySnapshot = await getDocs(orderCollectionRef);

      const orderData = [];
      querySnapshot.forEach((doc) => {
        const { ProductID, ProductImg, ProductName, UserID } = doc.data();
        if (UserID === user.uid) {
          orderData.push({
            ProductID,
            ProductImg,
            ProductName,
          });
        }
      });
      setProductData(orderData);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const saveDataToWReview = async (reviewData) => {
    try {
      const wReviewCollectionRef = collection(dbService, 'WReview');
      await addDoc(wReviewCollectionRef, reviewData);
      console.log('Data saved to WReview collection successfully!');
    } catch (error) {
      console.error('Error saving data to WReview collection:', error);
    }
  };

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const orderCollectionRef = collection(dbService, 'Order');
        const querySnapshot = await getDocs(orderCollectionRef);
  
        const orderData = [];
        querySnapshot.forEach((doc) => {
          const { ProductID, ProductImg, ProductName, UserID } = doc.data();
          if (UserID === user.uid) {
            orderData.push({
              ProductID,
              ProductImg,
              ProductName,
            });
          }
        });
        setProductData(orderData);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
  
    getOrderData();
  }, [user.uid]); // user.uid를 의존성 배열에 추가
  

  useEffect(() => {
    const fetchConfirmedProducts = async () => {
      try {
        const wReviewCollectionRef = collection(dbService, 'WReview');
        const querySnapshot = await getDocs(wReviewCollectionRef);
        const confirmedProductIds = [];
        querySnapshot.forEach((doc) => {
          const { ProductID, userId } = doc.data();
          if (userId === user.uid) {
            confirmedProductIds.push(ProductID);
          }
        });
        setConfirmedProducts(confirmedProductIds);
      } catch (error) {
        console.error('Error retrieving confirmed products:', error);
      }
    };

    fetchConfirmedProducts();
  }, [user.uid]);

  const ConfirmationComplete = async (product) => {
    try {
      const shouldSave = window.confirm('구매확정 하시겠습니까?');
      if (shouldSave) {
        if (confirmedProducts.includes(product.ProductID)) {
          console.log('이미 구매 확정된 상품입니다.');
          return;
        }

        const reviewData = {
          ProductID: product.ProductID,
          ProductImg: product.ProductImg,
          ProductName: product.ProductName,
          ReviewWrite: false,
          DeliveryDone: true,
          userId: user.uid,
        };

        saveDataToWReview(reviewData);
        setConfirmedProducts((prevProducts) => [...prevProducts, product.ProductID]);
      } else {
        console.log('Save to WReview cancelled by user.');
      }
    } catch (error) {
      console.error('Error saving data to WReview collection:', error);
    }
  };

  {/*운송장 제작*/}

  const generateRandomNumericString = (length) => {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleSubmit = async (event, product) => {
    event.preventDefault();

    const newTrackingNumber = generateRandomNumericString(12);
    setTrackingNumber(newTrackingNumber);

    const trackingData = {
      TrackingNumber: newTrackingNumber,
      createdAt: Date.now(),
      creatorId: user.uid,
      ProductID: product.ProductID
    };

    try {
      const docRef = await addDoc(collection(dbService, "DeliveryTracking"), trackingData);
      console.log("운송장 번호가 성공적으로 저장되었습니다. 문서 ID:", docRef.id);
    } catch (error) {
      console.error("운송장 번호 저장 중 오류가 발생했습니다.", error);
    }

    // 배송조회 버튼을 클릭하면 Tracker로 이동하도록 설정
    window.open(
      `http://info.sweettracker.co.kr/tracking/5?t_key=AvyWMRazruOJcBTdlYl1Hw&t_code=04&t_invoice=${newTrackingNumber}`,
      '_blank'
    );
  };

  return (
    <div className="ShopList">
      {productData.map((product) => (
        <Col key={product.ProductID} sm={4} className="mb-4">
          <div className="card">
            <img src={product.ProductImg || Pic} className="card-img-top" id="imgConts" alt={product.ProductName} />
            <div className="card-body">
              <h5 className="card-title">{product.ProductName}</h5>
              {!confirmedProducts.includes(product.ProductID) && (
                <button
                  className={`${'btn btn-outline-primary'} ${'orderConfirm'}`}
                  onClick={() => ConfirmationComplete(product)}
                  disabled={confirmedProducts.includes(product.ProductID)}
                >
                  구매 확정
                </button>
              )}
              <Link to={`/product/${product.ProductID}`} className={`${'btn btn-outline-primary'} ${'viewDetail'}`}>
                교환/환불 문의
              </Link>

              <form
                  action="http://info.sweettracker.co.kr/tracking/5"
                  method="post" >
                  <input
                    type="hidden"
                    name="t_key"
                    defaultValue="AvyWMRazruOJcBTdlYl1Hw" />
                  <input
                    type="hidden"
                    name="t_code"
                    defaultValue={'04'} />
                  <input
                    type="hidden"
                    name="t_invoice"
                    defaultValue={product.TrackingNumber} />
                  <input
                    type="submit"
                    className={`${"btn btn-outline-primary"} ${"deliTrack"}`}
                    value={"배송조회"}
                    id="submitBtn"
                    />
                </form>
            </div>
          </div>
        </Col>
      ))}
    </div>
  );
};

export default ShopList;
