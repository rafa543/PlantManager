import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confimation';
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
      options={{ headerTitle: '' }}
    />
    <stackRoutes.Screen
      name="Confirmation"
      component={Confirmation}
      options={{ headerTitle: '' }}
    />
  </stackRoutes.Navigator>
);

export default AppRoutes;
