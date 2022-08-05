function Validation(){
    this.checkEmpty = function(inputVal,spanID,message){
        if(inputVal.trim() != ""){
            //ID hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        //Không hợp lệ
        //Điền câu thông báo lên UI
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "Block";
        return false;
    }

    this.checkTKNV = function(inputVal,spanID,message,mangNV){
        /**
         * Duyệt mảng
         *          so sánh mã của từng sinh viên với inpuVal
         *          Nếu trùng => thông báo lỗi => return về False
         *          Ngược lại => hợp lệ
         */

        // some() => duyệt mảng, some(function(item(sv),index){}) => return true/false
        var isExist = false; //Giá sử mã chưa tồn tại
        isExist = mangNV.some(function(nv,index){
            // return kết quả của biểu thức so sánh
            return nv.taiKhoanNV === inputVal.replaceAll(" ","");
        });
        if(isExist){
            //Mã bị trùng => dữ liệu không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false; 
        }else{
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }
}