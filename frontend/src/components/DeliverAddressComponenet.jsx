import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Radio, Select, Typography , message} from 'antd'
const { Text: AntText, Title } = Typography;
import statesOfIndia from '../utils/states';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice';

const DeliverAddressComponenet = ({address, setAddress}) => {
    const [showAddressForm, setShowAddressForm] = useState(!address);
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState(address || {
      name: "",
      phone: null,
      pincode: "",
      street: "",
      city: "",
      state: "",
      country: "",
      landmark: "",
      addresstype: "home",
    });
    const dispatch = useDispatch();
    const handleAddressFormChange = (field, value) => {
        setNewAddress((prev) => ({ ...prev, [field]: value }));
      };
    
      const handleSaveNewAddress = async() => {
        setAddress(newAddress);
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/update`, {address:newAddress}, {
                withCredentials : true,
            });
            if(res?.data?.success){
                message.success("Address saved successfully");
                dispatch(setUser(res?.data?.user));
                setShowAddressForm(false);
            }
        } catch (error) {
            // console.log(error);
            message.error( error?.response?.data?.message || "Failed to save address");
        }finally{
            setLoading(false);
        }
        
      };

      useEffect(()=>{
        if(address){
          setNewAddress(address);
        }
      },[address])
  return (
    <>
    <Card className="shadow-md" title="2. Delivery Address">
          {showAddressForm ? (
            <div className="space-y-4 xl:w-[60%] sm:w-full">
              <Input
                placeholder="Name"
                value={newAddress.name}
                onChange={(e) => handleAddressFormChange("name", e.target.value)}
                className='rounded'
              />
              <Input
                placeholder="10-digit mobile number"
                value={newAddress.phone}
                onChange={(e) => handleAddressFormChange("phone", e.target.value)}
                className='rounded'
              />
              <div className="flex space-x-4">
                <Input
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => handleAddressFormChange("pincode", e.target.value)}
                  className='rounded'
                />
                <Input
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => handleAddressFormChange("country", e.target.value)}
                  className='rounded'
                />
              </div>
              <Input.TextArea
                placeholder="Address (Area and Street)"
                value={newAddress.street}
                onChange={(e) => handleAddressFormChange("street", e.target.value)}
                rows={3}
                className='rounded'
              />
              <div className="flex space-x-4">
                <Input
                  placeholder="City/District/Town"
                  value={newAddress.city}
                  onChange={(e) => handleAddressFormChange("city", e.target.value)}
                  className='rounded'
                />
                <Select
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(value) => handleAddressFormChange("state", value)}
                  className="w-full"
                >
                  {
                    statesOfIndia?.map((state)=>(
                        <Option value={state}>{state}</Option>
                    ))
                  }
                </Select>
              </div>
              <Input
                placeholder="Landmark (Optional)"
                value={newAddress.landmark}
                onChange={(e) => handleAddressFormChange("landmark", e.target.value)}
              />
              <Radio.Group
                onChange={(e) => handleAddressFormChange("addresstype", e.target.value)}
                value={newAddress.addresstype}
                className="flex space-x-4"
              >
                <Radio value="home">Home (All day delivery)</Radio>
                <Radio value="work">Work (Delivery between 10 AM - 5 PM)</Radio>
              </Radio.Group>
              <div className="flex space-x-4 mt-2">
                <Button type="primary" onClick={handleSaveNewAddress} loading={loading}>
                  Save and Deliver Here
                </Button>
                <Button onClick={() => setShowAddressForm(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <div className=''>
              <AntText>{address?.name}</AntText> <br />
              <AntText>{address?.phone}</AntText> <br />
              <AntText>{address?.street}, </AntText>
              <AntText> {address?.city}, </AntText>
              <AntText> {address?.pincode}, </AntText>
              <AntText> {address?.country} </AntText> <br />
              <AntText>LandMark : {address?.landmark} </AntText>

              </div>
              <Button type="link" onClick={() => setShowAddressForm(true)}>
                Change
              </Button>
            </div>
          )}
        </Card>

    </>
  )
}

export default DeliverAddressComponenet