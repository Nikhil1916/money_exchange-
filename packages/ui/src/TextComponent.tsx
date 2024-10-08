export const TextInput = ({
    placeholder,
    onChange,
    label,
    type = "text"
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type?: string
}) => {
    if(type == "number" || type == 'phonenumber') {
        return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={(e) => {
            if(type == 'number') {
                const regex = /^\d*\.?\d{0,2}$/;
                const value = e.target.value;
                if (regex.test(value.toString())) {
                  onChange(e.target.value);
                }
                e.target.value =  (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
            }
        }} onKeyDown={(e)=>{
            console.log(e.code, e?.keyCode);
            if((e?.keyCode<48 || e?.keyCode>57) && e?.keyCode!=8 && e?.keyCode!=37 && e?.keyCode!=39 && e?.keyCode!=46 && e?.keyCode!=17 && e?.keyCode!=65) {
                e?.preventDefault();
                console.log("okok");
            }
        }} type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
    </div>
    }
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={(e) => {
            onChange(e.target.value);
        }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
    </div>
}