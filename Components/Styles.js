import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "65%",
    height: 40,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  textInput: {
    height: 30,
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: -10,
    marginRight: 20
  },
  author: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  bookImage: {
    paddingTop: 10,
    height: 120,
    width: 120,
    marginLeft: -20
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 120
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  }
});

export default styles;