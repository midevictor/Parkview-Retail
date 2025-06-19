import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import CommonHeader from '@/components/CommonHeader';
import AppColors from '@/constants/Colors';
import { Product } from '@/type';
import { getProductById } from '@/lib/api';

const SingleProductScreen = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductById = async  () => {
            setLoading(true);
            try{
                const data = await getProductById(Number(id));
                setProduct(data);

            } catch (error) {
                console.error("Error fetching product:", error);
                setError("Failed to fetch product details.");
            }

        }
        if(id){
            fetchProductById();
        }
    }, [id]);


    console.log(product, "product")


    // console.log("Product ID:", id);
  return (
    <View style={{paddingTop: 30, backgroundColor:AppColors.background.primary}}>
      <CommonHeader />
    </View>
  )
}

export default SingleProductScreen

const styles = StyleSheet.create({})