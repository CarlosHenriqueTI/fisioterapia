import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function RegisterClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
    medicalHistory: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios');
      return;
    }
    
    // TODO: Implement client registration logic
    Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      address: '',
      medicalHistory: ''
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Cadastrar Cliente</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome completo *"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email *"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Telefone *"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={formData.cpf}
          onChangeText={(value) => handleInputChange('cpf', value)}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Data de nascimento (DD/MM/AAAA)"
          value={formData.birthDate}
          onChangeText={(value) => handleInputChange('birthDate', value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Histórico médico"
          value={formData.medicalHistory}
          onChangeText={(value) => handleInputChange('medicalHistory', value)}
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar Cliente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});