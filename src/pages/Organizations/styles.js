import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighter,
  },
  loading: {
    marginTop: metrics.baseMargin * 2,
  },
  columnWrap: {
    justifyContent: 'space-between',
    marginHorizontal: metrics.baseMargin * 2,
  },
});

export default styles;
