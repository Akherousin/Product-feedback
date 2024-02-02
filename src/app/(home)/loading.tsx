import SkeletonCardList from '@/components/SkeletonCardList';

export default function HomeLoading() {
  return (
    <div className="container column">
      <SkeletonCardList size={3} />;
    </div>
  );
}
