import data from '@/content/portfolio.json';
import PortfolioView from '@/components/PortfolioView';

export default function Home() {
  return <PortfolioView data={data} />;
}
