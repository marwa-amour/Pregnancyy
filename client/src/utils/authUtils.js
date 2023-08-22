import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const filterByObject=(arrToFilter, filterObjArr)=> {

  return arrToFilter.filter(arrElement => {

      const rowResult = filterObjArr.every(filterObj => {

          let conditionMet = false;

          if (filterObj.type === 'equals') {
              conditionMet = arrElement[filterObj.keyName] === filterObj.value;
          }

          if (filterObj.type === 'one-of') {
              conditionMet = (filterObj.value).includes(arrElement[filterObj.keyName])
          }

          if (filterObj.type === 'in-range') {
              const [min,max] = filterObj.value;
              conditionMet = arrElement[filterObj.keyName] >= min && arrElement[filterObj.keyName] <= max;
          }

          if (filterObj.type === 'contains') {
              conditionMet = (arrElement[filterObj.keyName]).includes(filterObj.value)
          }

          return conditionMet;

      })

      return rowResult;

  })
};

export const loadUserDataFromCookie = async () => {
  const tokenCookie = Cookies.get('token');
  if (tokenCookie) {
    const userData = await jwtDecode(tokenCookie);
    return { userData, isAuthenticated: true };
  }
  return { userData: null, isAuthenticated: false };
};



export const PregnancyCalculator=(bdika,y,m,d)=> {

  var day = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER","DECEMBER"];

  var curd = new Date(y,m-1,d);
  var res = new Date();

  if(bdika===0){
    if(curd.getMonth() === (m-1) && parseInt((res-curd)/86400000) <= 280 && parseInt((res-curd)/86400000) >= 0 && y!==""){
      return `${parseInt((res-curd)/86400000)}`;
    }
  } 
  //First Trimester Ends(12 Weeks)
  var fte = new Date(y, m-1, parseInt(d)+84);
  var fte12= day[fte.getDay()]+", "+month[fte.getMonth()]+" "+fte.getDate()+", "+fte.getFullYear();

  if(bdika===1){
    return fte12;
  }

  //Second Trimester Ends(27 Weeks):
  var ste = new Date(y, m-1, parseInt(d)+189);
  var ste27 = day[ste.getDay()]+", "+month[ste.getMonth()]+" "+ste.getDate()+", "+ste.getFullYear();

  if(bdika===2){
    return ste27;
  }

  //Estimated Due Date(40 Weeks) :
  var edd = new Date(y, m-1, parseInt(d)+280);
  var edd40 = day[edd.getDay()]+", "+month[edd.getMonth()]+" "+edd.getDate()+", "+edd.getFullYear();

  if(bdika===3){
  return edd40;
  }
}

