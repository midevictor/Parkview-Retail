
import HomeHeader from '@/components/ui/HomeHeader';
import Wrapper from '@/components/ui/Wrapper';
import AppColors from '@/constants/Colors';
import {  StyleSheet, View ,Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import { Product } from '@/type';
import { useProductStore } from '@/store/productStore';
import Loading from '@/components/Loading';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ui/ProductCard';
// import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

export default function HomeScreen() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const {products, categories, loading, error , fetchCategories, fetchProducts} = useProductStore();
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const reverseProducts = [...products].reverse();
      setFeaturedProducts(reverseProducts as Product[]);
    }
  }, [products]);
  
   if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Loading fullScreen />
        </View>
      </SafeAreaView>
    );
  }
  if(error){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const navigateCategory = (category: string) => {
    // Navigation logic to category screen
    // 
    router.push({
      pathname: "/(tabs)/shop",
      params: { category: category },
    });
  };

  const navigateToAllCategory = () => {

  }

  return (
    <View style={styles.wrapper}>
      <HomeHeader/>
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainerView}>
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {categories?.map((category) => (
                <TouchableOpacity key={category} style={styles.categoryButton} onPress={() => navigateCategory(category)}>
                  <AntDesign name='tag' size={16} color={AppColors.primary[500]}/>
                  <Text style={styles.categoryText}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
                
               ))}
               
            </ScrollView>
          </View>
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TouchableOpacity onPress={navigateToAllCategory}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
            data={featuredProducts}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredProductsContainer}
            renderItem={({item}) => (
              <View style={styles.featuredProductContainer}>
              <ProductCard product={item} compact/>
              </View>
            )}/>
          </View>

          {/* Newest Section */}
          <View style={styles.newestSection}>
            <View style={styles.sectionHeader}>
              <Text>Newest Arrivals</Text>
              <TouchableOpacity>
                <Text>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.productsGrid}>
              {products?.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                  <ProductCard product={product} customStyle={{width: "100%"}}/>
                </View>
              ))}

            </View>
          </View>
        </ScrollView>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
   wrapper: {
    backgroundColor: AppColors.background.primary,
  },
  contentContainer: {
    // paddingHorizontal: 20,
    paddingLeft: 20,
  },
  scrollContainerView: {
    paddingBottom: 300,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    color: "white",
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingRight: 20,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  seeAllText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.primary[500],
  },
  categoriesSection: {
    marginTop: 10,
    marginBottom: 16,
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.background.secondary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 100,
    marginLeft: 5,
  },
  categoryText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.text.primary,
    marginLeft: 8,
  },
  featuredSection: {
    marginVertical: 16,
  },
  featuredProductsContainer: {},
  featuredProductContainer: {
    // marginHorizontal: 8,
  },
  newestSection: {
    marginVertical: 16,
    marginBottom: 32,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  productContainer: {
    width: "48%",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: AppColors.error,
    textAlign: "center",
  },
 
});

