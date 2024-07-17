import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Inicializa o Stack Navigator
const Stack = createStackNavigator();

// Tela inicial
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-Vindo!</Text>
        <Text style={styles.subtitle}>Encontre nosso perfeito e saudável Sucos Frescos e Smoothies.</Text>
      </View>
      <Image 
        source={require('./assets/suco-removebg-preview.png')} 
        style={styles.image} 
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Vamos lá!</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de login
function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('./assets/suco-removebg-preview.png')} 
        style={styles.loginImage} 
      />
      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CPF ou E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder="CPF ou E-mail"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Senha"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

// Componente principal com navegação
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FE7656',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  loginImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#FE7656',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
