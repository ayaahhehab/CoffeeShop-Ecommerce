import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBGIcon from './GradientBGIcon';
import { COLORS, FONTFAMILY } from '../theme/theme';
import CustomIcon from './CustomIcon';
import { InnerScreen } from 'react-native-screens';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    index:number;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
  }
  
  const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    index,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
  }) => {
    return (
      <View>
        <ImageBackground
          source={imagelink_portrait}
          style={styles.ItemBackgroundImage}>
          {EnableBackHandler ? (
            <View style={styles.ImageHeaderBarContainerWithBack}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler();
                }}>
                <GradientBGIcon
                  name="left"
                  color={COLORS.primaryLightGreyHex}
                  size={16}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientBGIcon
                  name="like"
                  color={
                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                  }
                  size={16}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.ImageHeaderBarContainerWithoutBack}>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientBGIcon
                  name="like"
                  color={
                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                  }
                  size={16}
                />
              </TouchableOpacity>
            </View>
          )}
  
          <View style={styles.ImageInfoOuterContainer}>
            <View style={styles.ImageInfoInnerContainer}>
              <View style={styles.InfoContainerRow}>
                <View>
                  <Text style={styles.ItemTitleText}>{name}</Text>
                  <Text style={styles.ItemSubtitleText}>
                    {special_ingredient}
                  </Text>
                </View>
                <View style={styles.ItemPropertiesContainer}>
                  <View style={styles.ProperFirst}>
                    <CustomIcon
                      name={type == 'Bean' ? 'bean' : 'beans'}
                      size={type == 'Bean' ? 18 : 24}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text
                      style={[
                        styles.PropertyTextFirst,
                        {
                          marginTop:
                            type == 'Bean'
                              ? 4 + 2
                              : 0,
                        },
                      ]}>
                      {type}
                    </Text>
                  </View>
                  <View style={styles.ProperFirst}>
                    <CustomIcon
                      name={type == 'Bean' ? 'location' : 'drop'}
                      size={16}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.InfoContainerRow}>
                <View style={styles.RatingContainer}>
                  <CustomIcon
                    name={'star'}
                    color={COLORS.primaryOrangeHex}
                    size={20}
                  />
                  <Text style={styles.RatingText}>{average_rating}</Text>
                  <Text style={styles.RatingCountText}>({ratings_count})</Text>
                </View>
                <View style={styles.RoastedContainer}>
                  <Text style={styles.RoastedText}>{roasted}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    ItemBackgroundImage: {
      width: '100%',
      aspectRatio: 20 / 22,
      justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack: {
      padding: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithoutBack: {
      padding: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    ImageInfoOuterContainer: {
      paddingVertical: 20,
      paddingHorizontal: 30,
      backgroundColor: COLORS.primaryBlackRGBA,
      borderTopLeftRadius: 20 * 2,
      borderTopRightRadius: 20 * 2,
    },
    ImageInfoInnerContainer: {
      justifyContent: 'space-between',
      gap: 15,
    },
    InfoContainerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ItemTitleText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: 24,
      color: COLORS.primaryWhiteHex,
    },
    ItemSubtitleText: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize:12,
      color: COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    ProperFirst: {
      height: 55,
      width: 55,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primaryBlackHex,
    },
    PropertyTextFirst: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: 10,
      color: COLORS.primaryWhiteHex,
    },
    PropertyTextLast: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: 10,
      color: COLORS.primaryWhiteHex,
      marginTop: 2 +4,
    },
    RatingContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    RatingText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize:18,
      color: COLORS.primaryWhiteHex,
    },
    RatingCountText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: 12,
      color: COLORS.primaryWhiteHex,
    },
    RoastedContainer: {
      height: 55,
      width: 55 * 2 + 20,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primaryBlackHex,
    },
    RoastedText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: 10,
      color: COLORS.primaryWhiteHex,
    },
  });
  
  export default ImageBackgroundInfo;
