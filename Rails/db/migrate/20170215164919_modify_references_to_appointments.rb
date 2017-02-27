class ModifyReferencesToAppointments < ActiveRecord::Migration[5.0]
  def up
    remove_reference :appointments, :car, foreign_key: true, index: true, null: true
  
    add_reference :appointments, :client, foreign_key: true, index: true, null: true
  end
  def down
  	add_reference :appointments, :car, foreign_key: true, index: true, null: true

  	remove_reference :appointments, :client, foreign_key: true, index: true, null: true
  end
end
