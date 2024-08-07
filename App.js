import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Battery from 'expo-battery';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('./assets/suco-removebg-preview.png')} 
        style={styles.loginImage} 
      />
      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="Senha"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialCommunityIcons 
              name={passwordVisible ? "eye" : "eye-off"} 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de cadastro
function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleCpfChange = (text) => {
    let cleanText = text.replace(/\D/g, '');     
    if (cleanText.length <= 11) {
      if (cleanText.length <= 3) {
        setCpf(cleanText);
      } else if (cleanText.length <= 6) {
        setCpf(cleanText.replace(/(\d{3})(\d{0,3})/, '$1.$2'));
      } else if (cleanText.length <= 9) {
        setCpf(cleanText.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3'));
      } else {
        setCpf(cleanText.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4'));
      }
    }
  };

  const validateCPF = (cpf) => {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return cpfPattern.test(cpf);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = () => {
    if (!name || !cpf || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'Por favor, insira um CPF válido.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Main');
  };

  const handleNameChange = (text) => {
    const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
    setName(cleanedText);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('./assets/suco-removebg-preview.png')} 
        style={styles.loginImage} 
      />
      <Text style={styles.loginTitle}>Cadastre-se</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nome"
          value={name}
          onChangeText={handleNameChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CPF</Text>
        <TextInput 
          style={styles.input} 
          placeholder="CPF"
          value={cpf}
          onChangeText={handleCpfChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="Senha"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialCommunityIcons 
              name={passwordVisible ? "eye" : "eye-off"} 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirmar Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="Confirmar Senha"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <MaterialCommunityIcons 
              name={confirmPasswordVisible ? "eye" : "eye-off"} 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Menu utlizando o Material Bottom Tabs Navigator
const Tab = createMaterialBottomTabNavigator();
function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
      activeColor="#FE7656"
      inactiveColor="#000000"
      barStyle={{ backgroundColor: '#ffffff' }}
    >
      <Tab.Screen 
        name="Início" 
        component={HomeTab} 
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Busca" 
        component={SearchTab} 
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Pedidos" 
        component={OrdersTab} 
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileTab} 
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Utilizando sensor Expo Battery
function HomeTab() {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel(level * 100);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBatteryLevel().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    // Inicialmente atualiza o nível da bateria
    fetchBatteryLevel();

    // Atualizar o nível da bateria a cada 10 segundos
    const intervalId = setInterval(() => {
      onRefresh();
    }, 10000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [onRefresh]);

  // Função para calcular o preço do suco conforme o nível da bateria
  const calculatePrice = (basePrice) => {
    return basePrice + ((100 - 50) * 0.10);
  };

  const juices = [
    {
      id: '1',
      name: 'Suco Verde',
      description: 'Maçã, salsa e limão.',
      basePrice: 9,
      image: require('./assets/suco_verde2-removebg-preview.png'),
    },
    {
      id: '2',
      name: 'Suco Floresta',
      description: 'Pepino, couve e limão.',
      basePrice: 9,
      image: require('./assets/suco_roxo-removebg-preview.png'),
    },
    {
      id: '3',
      name: 'Energia',
      description: 'Cenoura, laranja e maçã.',
      basePrice: 9,
      image: require('./assets/suco_amarelo-removebg-preview.png'),
    },
    {
      id: '4',
      name: 'Vigor',
      description: 'Maçã, beterraba, brócolis e erva-doce.',
      basePrice: 9,
      image: require('./assets/suco_vermelho-removebg-preview.png'),
    },
  ];

  // Função para pesquisar os itens a partir do nome
  const [searchText, setSearchText] = useState('');
  const filteredJuices = juices.filter((juice) =>
    juice.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.homeContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.headerText}>Descubra</Text>
      <Text style={styles.subheaderText}>Os sucos saudáveis perfeitos</Text>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="gray" />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Pesquisar"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <Text style={styles.sectionTitle}>Recomendados</Text>
      <View style={styles.juiceContainer}>
        {filteredJuices.map((juice) => (
          <View key={juice.id} style={styles.juiceBox}>
            <Image source={juice.image} style={styles.juiceImage} />
            <Text style={styles.juiceName}>{juice.name}</Text>
            <Text style={styles.juiceDescription}>{juice.description}</Text>
            <Text style={styles.juicePrice}>${calculatePrice(juice.basePrice).toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function SearchTab() {
  return (
    <View style={styles.tabContainer}>
      <Text>Search Tab</Text>
    </View>
  );
}

function OrdersTab() {
  return (
    <View style={styles.tabContainer}>
      <Text>Orders Tab</Text>
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={styles.tabContainer}>
      <Text>Profile Tab</Text>
    </View>
  );
}

// Componente principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
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
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
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
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  subheaderText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  juiceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  juiceBox: {
    width: '48%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
  },
  juiceImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  juiceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  juiceDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  juicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FE7656',
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
