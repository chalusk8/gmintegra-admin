import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { getUserAccessListForService } from '../../mock/clientUsers'

const PANEL_W = 288
const LEAVE_MS = 200

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
}

function computePanelPosition(anchor) {
  const margin = 8
  const estHeight = 200
  let left = anchor.left
  if (left + PANEL_W > window.innerWidth - margin) {
    left = window.innerWidth - PANEL_W - margin
  }
  if (left < margin) left = margin

  let top = anchor.bottom - 4
  if (top + estHeight > window.innerHeight - margin && anchor.top - estHeight + 4 > margin) {
    top = anchor.top - estHeight + 4
  }
  if (top < margin) top = margin

  return { top, left }
}

export function ServiceUserEmailsCascade({ client, serviceName, label }) {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const leaveTimer = useRef(null)
  const triggerRef = useRef(null)

  const clearLeave = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearLeave()
    leaveTimer.current = window.setTimeout(() => {
      setOpen(false)
      setAnchor(null)
    }, LEAVE_MS)
  }, [clearLeave])

  const openFrom = useCallback(
    (el) => {
      clearLeave()
      const r = el.getBoundingClientRect()
      setAnchor({ top: r.top, left: r.left, bottom: r.bottom, right: r.right, width: r.width })
      setOpen(true)
    },
    [clearLeave],
  )

  useEffect(() => {
    if (!open) return undefined
    function onScroll() {
      const el = triggerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setAnchor({ top: r.top, left: r.left, bottom: r.bottom, right: r.right, width: r.width })
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        setAnchor(null)
      }
    }
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => () => clearLeave(), [clearLeave])

  const users = client && serviceName ? getUserAccessListForService(client, serviceName) : []
  const pos = anchor ? computePanelPosition(anchor) : { top: 0, left: 0 }

  const panel = (
    <AnimatePresence>
      {open && anchor ? (
        <motion.div
          key={`${client.id}-${serviceName}`}
          role="region"
          aria-label={`Correos de usuarios con acceso a ${serviceName}`}
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[100] w-[288px] max-w-[calc(100vw-16px)] overflow-hidden rounded-lg border border-orange-200/90 bg-white shadow-xl shadow-orange-950/15 ring-1 ring-orange-100"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={clearLeave}
          onMouseLeave={scheduleClose}
        >
          <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/80 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-900">{serviceName}</p>
            <p className="truncate text-xs font-semibold text-neutral-800">{client.company}</p>
          </div>
          <div className="max-h-52 overflow-y-auto px-2 py-2">
            {users.length === 0 ? (
              <p className="px-2 py-3 text-xs text-neutral-500">No hay usuarios mock con acceso a este servicio.</p>
            ) : (
              <motion.ul
                className="space-y-1.5"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {users.map((u) => (
                  <motion.li
                    key={u.id}
                    variants={rowVariants}
                    className="flex gap-2 rounded-md border border-neutral-100 bg-neutral-50/90 px-2 py-1.5"
                  >
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF8C00]" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold leading-tight text-neutral-800">{u.displayName}</p>
                      <p className="break-all font-mono text-[10px] font-medium leading-snug text-neutral-600">
                        {u.email}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          <p className="border-t border-neutral-100 bg-neutral-50 px-2 py-1.5 text-[10px] text-neutral-500">
            Solo usuarios con este servicio habilitado · correos simulados
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-block cursor-default rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[11px] font-medium text-neutral-800 transition-colors hover:border-orange-300 hover:bg-orange-50/90 hover:text-orange-950"
        onMouseEnter={(e) => openFrom(e.currentTarget)}
        onMouseLeave={scheduleClose}
      >
        {label}
      </span>
      {typeof document !== 'undefined' ? createPortal(panel, document.body) : null}
    </>
  )
}
