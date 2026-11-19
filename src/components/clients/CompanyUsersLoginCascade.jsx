import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Mail } from 'lucide-react'
import { getUsersForClient } from '../../mock/clientUsers'

const PANEL_W = 320
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
  const estHeight = 260
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

/**
 * Envuelve el nombre de empresa (p. ej. un Link): al pasar el ratón muestra en cascada
 * nombre y correo; cada fila enlaza a la ficha del usuario en una página dedicada.
 */
export function CompanyUsersLoginCascade({ client, children }) {
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

  const users = client ? getUsersForClient(client) : []
  const pos = anchor ? computePanelPosition(anchor) : { top: 0, left: 0 }

  const panel = (
    <AnimatePresence>
      {open && anchor ? (
        <motion.div
          key={`${client.id}-company-users`}
          role="region"
          aria-label={`Usuarios de ${client.company}`}
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[100] w-[min(100vw-16px,320px)] max-w-[calc(100vw-16px)] overflow-hidden rounded-lg border border-orange-200/90 bg-white shadow-xl shadow-orange-950/15 ring-1 ring-orange-100"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={clearLeave}
          onMouseLeave={scheduleClose}
        >
          <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/80 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-900">Usuarios</p>
            <p className="truncate text-xs font-semibold text-neutral-800">{client.company}</p>
            <p className="mt-0.5 text-[10px] text-neutral-600">
              Clic en un usuario para abrir su ficha (RFC, login de portal, servicios).
            </p>
          </div>
          <div className="max-h-[min(48vh,320px)] overflow-y-auto px-2 py-2">
            {users.length === 0 ? (
              <p className="px-2 py-3 text-xs text-neutral-500">No hay usuarios mock para esta empresa.</p>
            ) : (
              <motion.ul
                className="space-y-1.5"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {users.map((u) => (
                  <motion.li key={u.id} variants={rowVariants} className="list-none">
                    <Link
                      to={`/clients/${client.id}/usuario/${encodeURIComponent(u.id)}`}
                      className="group flex w-full gap-2 rounded-md border border-neutral-100 bg-neutral-50/90 px-2 py-1.5 text-left transition-colors hover:border-orange-300 hover:bg-orange-50/80"
                      onClick={() => {
                        setOpen(false)
                        setAnchor(null)
                      }}
                    >
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF8C00]" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold leading-tight text-[#ea580c] underline-offset-2 group-hover:underline">
                          {u.displayName}
                        </p>
                        <p className="break-all font-mono text-[10px] font-medium leading-snug text-neutral-600">
                          {u.email}
                        </p>
                      </div>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          <p className="border-t border-neutral-100 bg-neutral-50 px-2 py-1.5 text-[10px] text-neutral-500">
            Enlaces a ficha por usuario · clic en el nombre de la empresa: detalle de empresa
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-block max-w-full"
        onMouseEnter={(e) => openFrom(e.currentTarget)}
        onMouseLeave={scheduleClose}
      >
        {children}
      </span>
      {typeof document !== 'undefined' ? createPortal(panel, document.body) : null}
    </>
  )
}
