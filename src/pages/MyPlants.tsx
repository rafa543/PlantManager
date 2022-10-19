import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, Alert } from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'

import waterdrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler'
import { loadPlant, PlantProps, removePlants, StoragePlantProps } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState<string>()

    function handleRemove(plant: PlantProps) {
        Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏🏼',
                style: 'cancel'
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        await removePlants(plant.id)

                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        )
                    } catch (error) {
                        Alert.alert("Não foi possivel remover!")
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();
            
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )
            
            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} á ${nextTime} horas.`
            )

            setMyPlants(plantsStoraged)
            setLoading(false)
        }

        loadStorageData()
    })

    if (loading) {
        return <Load />
        
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterdrop} style={styles.spotlightImage} />
                <Text style={styles.spotlightText}>{nextWatered}</Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>Proximas regadas</Text>

                <FlatList data={myPlants} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <PlantCardSecondary data={{
                        name: item.name,
                        photo: item.photo,
                        hour: item.hour,
                    }} handleRemove={() => { handleRemove(item) }} />
                )}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    textInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        ustifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})