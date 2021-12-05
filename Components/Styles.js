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
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  textInput: {
    height: 30,
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    width: "25%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgb(116, 144, 147)",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: -10,
    marginRight: 20
  },
  searchTitle: {
    fontFamily: 'serif',
    fontSize: 20,
    marginBottom: 30,
  },
  shelvesTitle: {
    paddingVertical: 30,
    textAlign: 'center',
    fontFamily: 'serif',
    alignItems: "center",
    fontSize: 20,
    width: '70%',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  shelfTitle: {
    paddingVertical: 30,
    textAlign: 'center',
    fontFamily: 'serif',
    fontSize: 20,
    marginVertical: 10,
    padding: 100,
  },
  bookshelfContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 40,
    borderBottomWidth: 1,
    borderColor: "rgb(116, 144, 147)",
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