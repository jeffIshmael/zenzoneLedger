import React from 'react';
import CreatePackage from '@/components/CreatePackage';
import Header from '@/components/Header';

const PackageCreate = () => {
  return (
    <div>
      <div className="md:hidden">
        <Header />
      </div>
      <CreatePackage />
      </div>
  )
}

export default PackageCreate