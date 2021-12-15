import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "rgb(116, 144, 147)",
    borderBottomColor: 'rgb(116, 144, 147)',
    borderTopColor: 'rgb(116, 144, 147)',
  },
  textInput: {
    backgroundColor: "#ffff",
    width: '100%',
    borderRadius: 50,
    height: 40,
  },
  title: {
    fontSize: 20,
    marginRight: -100,
    marginRight: 20,
    paddingRight: 100,
    fontFamily: 'serif',
    color: 'black'
  },
  emptyTitle: {
    textAlign: 'center',
    fontFamily: 'serif',
    fontSize: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "rgb(116, 144, 147)",
    color: 'black'
  },
  // Read shelf styles...
  readTitle: {
    fontSize: 20,
    marginRight: 80,
    paddingRight: 100,
    fontFamily: 'serif',
    color: 'black'
  },
  readButton: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingBottom: 10,
  },
  rating: {
    paddingRight: 190,
  },
  // Home styles...
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  homeTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'serif',
    color: 'black',
    paddingHorizontal: 60,
    paddingVertical: 20,
  },
  // ...
  searchTitle: {
    fontFamily: 'serif',
    fontSize: 25,
    marginTop: 100,
  },
  shelvesTitle: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
    fontSize: 20,
    width: '60%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgb(116, 144, 147)",
  },
  shelfTitle: {
    flex: 0,
    paddingVertical: 40,
    fontFamily: 'serif',
    fontSize: 20,
    marginBottom: 25,
    marginRight: 100,
    textAlign: 'center',
  },
  bookshelfContainer: {
    flex: 0.5,
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 40,
    borderBottomWidth: 1,
    borderColor: "rgb(116, 144, 147)",
    justifyContent: 'flex-start'
  },
  author: {
    paddingLeft: 10,
    marginRight: 70,
    marginBottom: 10,
    fontFamily: 'serif',
    fontSize: 15,
    color: 'grey',
  },
  bookImage: {
    paddingTop: 10,
    height: 140,
    width: 140,
    marginLeft: -30,
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
  },
  // Register Styles...
  registerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  registerTitle: {
    fontFamily: 'serif',
    fontSize: 20,
    marginBottom: 30,
  },
  registerBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "rgb(116, 144, 147)",
  },
  registerInputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'black',
  },
  registerTextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center'
  },
  registerImage: {
    width: "55%",
    height: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  registerInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  // Login styles...
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginRegisterBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "transparent",
  },
  loginTitle: {
    fontFamily: 'serif',
    fontSize: 20,
    marginBottom: 30,
  },
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "rgb(116, 144, 147)",
  },
  loginInputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'black',
  },
  loginTextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center'
  },
  loginImage: {
    width: "55%",
    height: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  // Styles for details page
  detailsContainer: {
    paddingBottom: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
    color: 'white',
    backgroundColor: 'rgb(116, 144, 147)'
  },
  pickerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  detailsImageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },
  detailsTitle: {
    fontFamily: 'serif',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  additionalInfo: {
    fontFamily: 'serif',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  detailsHeader: {
    fontFamily: 'serif',
    marginVertical: 20,
    fontSize: 20,
    marginRight: -10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  detailsAuthor: {
    fontFamily: 'serif',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  detailsDescription: {
    fontFamily: 'serif',
    alignItems: 'center',
    paddingHorizontal: 30,
    lineHeight: 21
  },
  descriptionMore: {
    fontFamily: 'serif',
    alignItems: 'center',
    paddingHorizontal: 30,
    lineHeight: 21,
    marginTop: 10
  },
  detailsBookImage: {
    flex: 1,
    marginVertical: 8,
    height: 220,
    width: 220,
    alignItems: 'center',
  },
});

export default styles;