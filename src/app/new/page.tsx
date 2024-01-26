import CreateRequestForm from '@/components/CreateRequestForm';
import GoBackLink from '@/components/GoBackLink';

export default async function NewRequest() {
  return (
    <>
      <header>
        <div className="container">
          <GoBackLink />
        </div>
      </header>
      <main>
        <div className="container ">
          <CreateRequestForm />
        </div>
      </main>
    </>
  );
}
