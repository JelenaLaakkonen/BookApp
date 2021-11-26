import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: -10,
    marginRight: 20
  },
  author: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    width: 190,
    paddingTop: 35
  },
  bookImage: {
    height: 120,
    width: 120,
    marginLeft: -20
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 120

  }
});

export default styles;