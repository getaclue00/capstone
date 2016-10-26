class RemoveNotesConstraintsFromAppointments < ActiveRecord::Migration[5.0]
  def up
    change_column :appointments, :notes, :text, default: ''
  end

  def down
    change_column :appointments, :notes, :text, null: false, default: ''
  end
end
