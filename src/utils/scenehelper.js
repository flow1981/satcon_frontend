
import {Vector3, Matrix4} from "three";

export const adjustObjectOrientation = (object) => {
    // object.rotation.x = 90 * Math.PI / 180; //adapt to camera view (z-top)
    // object.rotation.y = -90 * Math.PI / 180; //align with Greenwich
    // object.rotation.z = 90 * Math.PI / 180; //align with Greenwich
    return object;
};

export const adjustGlobalOrientation = (vector) => {
    // const xAxis = new Vector3(0, 0, 1);
    // const yAxis = new Vector3(0, 1, 0);
    // const zAxis = new Vector3(1, 0, 0);
    // let xRotation = new Matrix4().makeRotationAxis(xAxis, -90*Math.PI / 180)
    // let yRotation = new Matrix4().makeRotationAxis(yAxis, -90*Math.PI / 180)
    // let zRotation = new Matrix4().makeRotationAxis(zAxis, -90*Math.PI / 180)

    // vector.applyMatrix4(xRotation)
    // vector.applyMatrix4(yRotation)
    // vector.applyMatrix4(zRotation)
    // return vector
}

// export const coordTransformation = (object) => {
//     //apply following coorrections .. to three.js  coord system
//     //rotation "z-xis" from "to screen" to oritation "top"
//     object.applyMatrix(new Matrix4().makeRotationX(-90 * Math.PI/180));
//     //rotate "new y" from "away from screen" to "left"
//     object.applyMatrix(new Matrix4().makeRotationY(-90 * Math.PI /180));
//     return object
//   }


export const getGHA = (date) => {
    // Scope:     calculate Sun's longitude > Greenwoch Hour angle based on input date object
    // reference: https://astronavigationdemystified.com/converting-gmt-to-gha/
    // reference: http://www.jgiesen.de/astro/suncalc/
  
      let GHA =[];
  
      let utc_now   = date.toUTCString()  //convert time stamp/date object to UTC time
     
      let dayofyear = getDaysIntoYear(date);        //determine day of the year for equation of time based angle/time correction
      let EoT=getEoT(dayofyear);
  
      //console.log('dayofyear',dayofyear)
      //console.log('EoT',EoT)
  
      let hours   = date.getUTCHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
  
      GHA= hours*15 + (minutes+seconds/60)/4 + EoT/4; //deg, 1h > 1*15 deg , 1m > 1/4 deg
   
      if(GHA<180) {GHA=GHA+180}
      else        {GHA=GHA-180}
    
    return GHA //deg
  }

  export const getDaysIntoYear = (date) => {
    //returns current day of the year
    //reference: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
      
    let dayofyear = (Date.UTC( date.getFullYear(), 
                               date.getMonth(),
                               date.getDate()     ) - Date.UTC(date.getFullYear(), 
                                                                 0, 
                                                                 0)
                                ) / 24 / 60 / 60 / 1000;
      
    return dayofyear; //days
  }

  export const getEoT = (dayofyear) => {
    //returns time correction based on "equation of time"
    //Source: https://www.intmath.com/blog/mathematics/the-equation-of-time-5039
    
    let EoT=-7.655*Math.sin(2*Math.PI*dayofyear/365)+9.873*Math.sin(4*Math.PI/365*dayofyear+3.588)
      
    return EoT; //min
  }

export const getSunDeclination = (dateObject) => {
    //get current sun declination angle (angle above equator)
    //reference: https://www.itacanet.org/the-sun-as-a-source-of-energy/part-3-calculating-solar-angles/

    let dayintoyear = getDaysIntoYear(dateObject) //days
    let sunDec      = 23.45*Math.sin(2*Math.PI*((284+dayintoyear)/36.25)*Math.PI/180); //deg
    
    console.log('sunDec',sunDec)
  return sunDec;
}