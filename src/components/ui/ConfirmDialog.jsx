import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './Button.jsx';

export function ConfirmDialog({ open, title, description, confirmLabel = 'Hapus', loading, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="glass-strong w-full max-w-sm rounded-2xl p-6"
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: 'spring', duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-ink">{title}</h3>
            {description && <p className="mt-2 text-sm text-sub">{description}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={onCancel} disabled={loading}>
                Batal
              </Button>
              <Button variant="danger" onClick={onConfirm} disabled={loading}>
                {loading ? 'Menghapus...' : confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
