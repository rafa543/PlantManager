import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confimation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import AuthRouttes from './tab.routes';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: colors.white },
    }}
  >
    <stackRoutes.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerTitle: '' }}
    />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
      options={{ headerTitle: '', headerShown: false }}
    />
    <stackRoutes.Screen
      name="Confirmation"
      component={Confirmation}
      options={{ headerTitle: '', headerShown: false }}
    />

    <stackRoutes.Screen
      name="PlantSelect"
      component={AuthRouttes}
      options={{ headerTitle: '', headerShown: false }}
    />

    <stackRoutes.Screen
      name="PlantSave"
      component={PlantSave}
      options={{ headerTitle: '', headerShown: false }}
    />

    <stackRoutes.Screen
      name="MyPlants"
      component={AuthRouttes}
      options={{ headerTitle: '', headerShown: false }}
    />

  </stackRoutes.Navigator>
);

export default AppRoutes;
