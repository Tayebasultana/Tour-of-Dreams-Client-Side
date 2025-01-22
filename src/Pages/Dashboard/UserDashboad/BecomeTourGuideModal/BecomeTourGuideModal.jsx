import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

const BecomeTourGuideModal = ({ closeModal, isOpen, requestHandler }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white">
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Become a Tour Guide
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Fill out the form to become a tour guide.
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-4">
                                        <button
                                            onClick={requestHandler}
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Send Request
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

BecomeTourGuideModal.propTypes = {
    requestHandler: PropTypes.func,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default BecomeTourGuideModal;
