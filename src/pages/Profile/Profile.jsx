import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMapPin, FiSettings, FiEdit2, FiTrash2, FiPlus, FiBriefcase } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

export default function Profile() {
  const { user, updateProfile, saveAddress, deleteAddress, loading } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('info'); // 'info', 'addresses', 'settings'
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Profile Form
  const { register: regProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      storeName: user?.storeName || '',
      description: user?.description || '',
    }
  });

  // Address Form
  const { register: regAddress, handleSubmit: handleAddressFormSubmit, reset: resetAddressForm, setValue: setAddressValue } = useForm();

  const onProfileUpdate = async (data) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  const openAddressModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressValue('type', address.type);
      setAddressValue('street', address.street);
      setAddressValue('city', address.city);
      setAddressValue('state', address.state);
      setAddressValue('zip', address.zip);
      setAddressValue('country', address.country);
      setAddressValue('isDefault', address.isDefault);
    } else {
      setEditingAddress(null);
      resetAddressForm({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        isDefault: false,
      });
    }
    setIsAddressModalOpen(true);
  };

  const onAddressSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        id: editingAddress ? editingAddress.id : undefined,
      };
      await saveAddress(payload);
      toast.success(editingAddress ? 'Address updated!' : 'Address added!');
      setIsAddressModalOpen(false);
    } catch (err) {
      toast.error('Failed to save address.');
    }
  };

  const handleAddressDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        toast.info('Address removed.');
      } catch (err) {
        toast.error('Failed to delete address.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white leading-none">
          My Account
        </h1>
        <p className="text-xs text-slate-400 mt-1.5">
          Manage your personal details, shipping addresses, and developer store options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Nav (1/4 width) */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-4 shadow-sm space-y-1.5">
          <button
            onClick={() => setActiveTab('info')}
            className={`
              w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
              ${activeTab === 'info'
                ? 'bg-primary-50 text-primary-600 dark:bg-slate-750 dark:text-primary-400'
                : 'text-slate-650 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-750/50'
              }
            `}
          >
            <FiUser className="w-4.5 h-4.5" /> Personal Details
          </button>
          
          {user?.role === 'buyer' && (
            <button
              onClick={() => setActiveTab('addresses')}
              className={`
                w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
                ${activeTab === 'addresses'
                  ? 'bg-primary-50 text-primary-600 dark:bg-slate-750 dark:text-primary-400'
                  : 'text-slate-655 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-750/50'
                }
              `}
            >
              <FiMapPin className="w-4.5 h-4.5" /> Saved Addresses
            </button>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            className={`
              w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
              ${activeTab === 'settings'
                ? 'bg-primary-50 text-primary-600 dark:bg-slate-750 dark:text-primary-400'
                : 'text-slate-655 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-750/50'
              }
            `}
          >
            <FiSettings className="w-4.5 h-4.5" /> Settings
          </button>
        </div>

        {/* Content Pane (3/4 width) */}
        <div className="md:col-span-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Tab 1: Info Form */}
          {activeTab === 'info' && (
            <form onSubmit={handleProfileSubmit(onProfileUpdate)} className="space-y-6">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-750">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  id="name"
                  error={profileErrors.name}
                  {...regProfile('name', { required: 'Name is required' })}
                />
                <Input
                  label="Email Address"
                  id="email"
                  disabled
                  className="opacity-70"
                  error={profileErrors.email}
                  {...regProfile('email')}
                />
              </div>

              {/* If merchant, show merchant details */}
              {user?.role === 'seller' && (
                <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-750 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FiBriefcase /> Storefront Customizations</h4>
                  <Input
                    label="Store Name"
                    id="storeName"
                    error={profileErrors.storeName}
                    {...regProfile('storeName', { required: 'Store name is required' })}
                  />
                  <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1.5 text-sm font-medium text-slate-705 dark:text-slate-300">
                      Store Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="px-3.5 py-2.5 border text-sm rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 dark:text-white focus:border-primary-500 outline-hidden"
                      {...regProfile('description')}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button type="submit" isLoading={loading} className="px-5 py-2">
                  Save Settings
                </Button>
              </div>
            </form>
          )}

          {/* Tab 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-750">
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  Shipping Directory
                </h3>
                <Button
                  size="sm"
                  onClick={() => openAddressModal()}
                  icon={FiPlus}
                  className="py-1.5"
                >
                  Add Address
                </Button>
              </div>

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/10 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-550 dark:text-slate-350">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-emerald-500 font-bold">Default</span>
                          )}
                        </div>
                        <p className="font-bold text-xs text-slate-805 dark:text-white">{addr.street}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{addr.city}, {addr.state} - {addr.zip}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{addr.country}</p>
                      </div>
                      
                      <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-750 mt-4 pt-3.5">
                        <button
                          onClick={() => openAddressModal(addr)}
                          className="p-1 text-slate-450 hover:text-primary-600 transition-colors cursor-pointer"
                          title="Edit address"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAddressDelete(addr.id)}
                          className="p-1 text-slate-450 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete address"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed rounded-xl text-slate-400 text-sm">
                  No saved addresses found. Add a shipping address to speed up checkout.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-slate-650 dark:text-slate-350">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-750">
                Account Settings
              </h3>
              
              <div className="space-y-4 text-xs font-normal">
                <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-750">
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white mb-0.5">Email Notifications</h5>
                    <p className="text-[10px] text-slate-400">Receive merchant order dispatches and promotions.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-750">
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white mb-0.5">Two-Factor Authentication</h5>
                    <p className="text-[10px] text-slate-400">Enable 2FA validation codes for account logins.</p>
                  </div>
                  <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Address Edit/Create Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={editingAddress ? 'Modify Address' : 'Register New Address'}
      >
        <form onSubmit={handleAddressFormSubmit(onAddressSubmit)} className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="type" className="mb-1 text-xs font-semibold text-slate-500">Address Label</label>
              <select
                id="type"
                className="px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 dark:text-white focus:border-primary-500 outline-hidden"
                {...regAddress('type', { required: true })}
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              label="Zip Code"
              id="zip"
              placeholder="560001"
              {...regAddress('zip', { required: true })}
            />
          </div>

          <Input
            label="Street Address"
            id="street"
            placeholder="123 Main St, Apartment 4B"
            {...regAddress('street', { required: true })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              id="city"
              placeholder="Bengaluru"
              {...regAddress('city', { required: true })}
            />
            <Input
              label="State"
              id="state"
              placeholder="Karnataka"
              {...regAddress('state', { required: true })}
            />
          </div>

          <Input
            label="Country"
            id="country"
            placeholder="India"
            {...regAddress('country', { required: true })}
          />

          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-650 dark:text-slate-350 pt-2">
            <input
              type="checkbox"
              className="rounded border-slate-305 text-primary-600 focus:ring-primary-500 cursor-pointer"
              {...regAddress('isDefault')}
            />
            Set as default shipping address
          </label>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsAddressModalOpen(false)}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-5 py-2">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
