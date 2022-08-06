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

    this.checkValTKNV = function(inputVal, spanID,message){
        /**
         * Duyệt mảng
         *          so sánh mã của từng sinh viên với inpuVal
         *          Nếu trùng => thông báo lỗi => return về False
         *          Ngược lại => hợp lệ
         */

        // some() => duyệt mảng, some(function(item(sv),index){}) => return true/false
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,6}$/
        if(inputVal.match(pattern)){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        }
    }

    this.checkName = function(inputVal,spanID,message){
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

        if(inputVal.match(pattern)){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        } 
    }

    this.checkEmail = function(inputVal,spanID,message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(inputVal.match(pattern)){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        } 
    }

    this.checkPassword = function(inputVal,spanID,message){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
        if(inputVal.match(pattern)){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        }
    }
    this.checkNgayLam = function(inputVal,spanID,message){
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
        if(inputVal.match(pattern)){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        }
    }

    this.checkLuongCB = function(inputVal,spanID,message){
        var pattern = /^[0-9]+$/
        if(inputVal.match(pattern) && inputVal >= 1000000 && inputVal <= 20000000){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        }
    }

    this.checkDropdown = function(selectID,spanID,message){
        var indexOption = document.getElementById(selectID).selectedIndex;
        if(indexOption != 0){
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        }
    }

    this.checkGioLam = function(inputVal,spanID,message){
        var pattern = /^[0-9]+$/
        if(inputVal.match(pattern) && inputVal >= 20 && inputVal <= 200){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "Block";
            return false;
        }
    }
}